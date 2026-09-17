import { useLoginFormController } from "./LoginForm.controller";

function GoogleIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
    );
}

export default function LoginForm() {

    const { user,
        loading,
        entrando,
        errorMessage,
        handleLogin } = useLoginFormController()

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#D0C9BF]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF654D] border-t-transparent"></div>
                <p className="rubik text-[#00337C] font-medium">Verificando sua sessão...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D0C9BF] p-4 md:p-8">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Painel da marca */}
                <div className="bg-[#00337C] text-white p-8 md:p-10 flex flex-col justify-between gap-8">
                    <img
                        src="/assets/images/logoImage.png"
                        className="w-28"
                        alt="Grupo Escoteiro Araraquara"
                    />

                    <div className="asap font-semibold text-3xl md:text-4xl leading-tight">
                        <p>VAMOS JUNTOS</p>
                        <p>MUDAR O MUNDO!</p>
                    </div>

                    <p className="rubik text-xs text-white/70">
                        Grupo Escoteiro Araraquara "José Luiz Torquato" - 21/SP
                    </p>
                </div>

                {/* Acesso */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                    <p className="asap text-[#FF654D] font-bold text-4xl md:text-5xl leading-none">
                        ÁREA DO
                    </p>
                    <p className="asap text-[#FF654D] font-bold text-4xl md:text-5xl leading-none mb-4">
                        ESCOTISTA
                    </p>

                    <p className="rubik text-[#00337C] mb-8">
                        Use sua conta institucional para acessar os relatórios de inscrição.
                    </p>

                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r rubik text-sm">
                            {errorMessage}
                        </div>
                    )}

                    {user ? (
                        <div className="rubik flex flex-col gap-3">
                            <p className="text-[#00337C]">
                                Olá, <strong>{user.displayName ?? user.email}</strong>
                            </p>
                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#FF654D] border-t-transparent"></div>
                                Redirecionando...
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={handleLogin}
                            disabled={entrando}
                            className="rubik w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl shadow-sm hover:shadow-md hover:border-[#FF654D] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {entrando ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#FF654D] border-t-transparent"></div>
                                    Entrando...
                                </>
                            ) : (
                                <>
                                    <GoogleIcon />
                                    Entrar com o Google
                                </>
                            )}
                        </button>
                    )}

                    <a
                        href="/"
                        className="rubik text-sm text-gray-500 hover:text-[#FF654D] transition-colors mt-8 inline-block"
                    >
                        ← Voltar para o site
                    </a>
                </div>
            </div>
        </div>
    )
}
