import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "../../../firebase/config";

export function useLoginFormController() {

    const navigate = useNavigate()
    const { user, loading } = useAuth()

    const handleLogin = async () => {
        try {

            const provider = new GoogleAuthProvider();
            setPersistence(auth, browserLocalPersistence);
            await signInWithRedirect(auth, provider)
        } catch (error) {
            console.log(error)
        }
    }
    return {
        user,
        loading,
        handleLogin,
        navigate
    }
}