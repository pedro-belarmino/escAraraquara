import Button from "@mui/material/Button";
import { useLoginFormController } from "./LoginForm.controller";

export default function LoginForm() {
    const { user, loading, handleLogin, navigate } = useLoginFormController()

    if (loading) return (
        <div className="flex-1 flex items-center justify-center p-8 min-h-[50vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF654D] border-t-transparent"></div>
        </div>
    )

    return (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 my-10 min-h-[60vh]">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 text-center space-y-6">
                <div className="flex justify-center">
                    <a href="/">
                        <img src="/assets/images/logoImage.png" className="w-24 hover:opacity-90 transition-opacity" alt="Logo" />
                    </a>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#00337C] asap">
                    Área do Escotista / Dirigente
                </h1>

                {!user ? (
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm sm:text-base rubik">
                            Use sua conta institucional (@escoteiros.org.br) para fazer login.
                        </p>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleLogin}
                            sx={{ backgroundColor: '#FF654D', '&:hover': { backgroundColor: '#e0543c' }, py: 1.5, borderRadius: 3, fontWeight: 'bold' }}
                        >
                            Entrar com Google
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-800 text-lg font-medium">
                            Olá, {user.displayName}!
                        </p>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate("/flor-de-lis/dashboard")}
                            sx={{ backgroundColor: '#00337C', py: 1.5, borderRadius: 3, fontWeight: 'bold' }}
                        >
                            Acessar Painel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}