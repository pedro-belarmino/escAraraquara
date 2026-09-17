import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
    GoogleAuthProvider,
    browserLocalPersistence,
    getRedirectResult,
    setPersistence,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../../firebase/config";

const DESTINO_PADRAO = "/pre-inscricao/dashboard";

/** O popup não funciona nesses casos; aí sim vale cair para o fluxo de redirect. */
const CODIGOS_FALLBACK_REDIRECT = [
    "auth/popup-blocked",
    "auth/operation-not-supported-in-this-environment",
];

/** Desistência do próprio usuário: não é erro, não precisa de mensagem. */
const CODIGOS_SILENCIOSOS = [
    "auth/popup-closed-by-user",
    "auth/cancelled-popup-request",
    "auth/user-cancelled",
];

const descreverErro = (codigo?: string): string => {
    switch (codigo) {
        case "auth/unauthorized-domain":
            return "Este domínio não está autorizado no Firebase Authentication. Peça para liberá-lo em Authentication > Settings > Authorized domains.";
        case "auth/network-request-failed":
            return "Falha de rede ao contatar o Google. Verifique sua conexão e tente de novo.";
        case "auth/account-exists-with-different-credential":
            return "Já existe uma conta com este e-mail usando outro método de login.";
        case "auth/popup-blocked":
            return "O navegador bloqueou a janela de login. Libere os pop-ups para este site e tente novamente.";
        default:
            return "Não foi possível concluir o login. Tente novamente.";
    }
};

const codigoDoErro = (error: unknown): string | undefined =>
    typeof error === "object" && error !== null && "code" in error
        ? String((error as { code: unknown }).code)
        : undefined;

export function useLoginFormController() {

    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading } = useAuth()

    const [entrando, setEntrando] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const destino =
        (location.state as { from?: string } | null)?.from ?? DESTINO_PADRAO;

    // Conclui o fluxo de redirect (usado quando o popup é bloqueado) e expõe o erro, se houver.
    useEffect(() => {
        getRedirectResult(auth).catch((error) => {
            console.error(error);
            const codigo = codigoDoErro(error);
            if (!codigo || !CODIGOS_SILENCIOSOS.includes(codigo)) {
                setErrorMessage(descreverErro(codigo));
            }
        });
    }, []);

    // Assim que a sessão existe, sai da tela de login.
    useEffect(() => {
        if (!loading && user) {
            navigate(destino, { replace: true });
        }
    }, [loading, user, destino, navigate]);

    const handleLogin = async () => {
        setErrorMessage("")
        setEntrando(true)

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            // Precisa ser aguardado: sem isso a sessão pode não sobreviver ao recarregamento.
            await setPersistence(auth, browserLocalPersistence);
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error)
            const codigo = codigoDoErro(error);

            if (codigo && CODIGOS_FALLBACK_REDIRECT.includes(codigo)) {
                try {
                    await signInWithRedirect(auth, provider);
                    return;
                } catch (redirectError) {
                    console.error(redirectError)
                    setErrorMessage(descreverErro(codigoDoErro(redirectError)));
                }
            } else if (!codigo || !CODIGOS_SILENCIOSOS.includes(codigo)) {
                setErrorMessage(descreverErro(codigo));
            }
        } finally {
            setEntrando(false)
        }
    }

    return {
        user,
        loading,
        entrando,
        errorMessage,
        handleLogin,
        navigate
    }
}
