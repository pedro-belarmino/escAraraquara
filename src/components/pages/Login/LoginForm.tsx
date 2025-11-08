import Button from "@mui/material/Button";
import { useLoginFormController } from "./LoginForm.controller";

export default function LoginForm() {

    const { user,
        loading,
        handleLogin,
        navigate } = useLoginFormController()



    if (loading) return (<p>carregando</p>)


    return (
        <>
            area do escotista / Dirigente
            <br />
            {!user ? (
                <>
                    use sua conta institucional para fazer o Login
                    <Button onClick={handleLogin}>Logar</Button>
                </>
            ) : (
                <>
                    ola {user.displayName}
                    <Button variant="contained" onClick={() => navigate("/asd")}>Entrar</Button>
                </>
            )}

        </>
    )
}