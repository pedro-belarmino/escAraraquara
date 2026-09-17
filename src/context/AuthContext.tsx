import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase/config"
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"

type AuthContextType = {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true
})

/**
 * Cria o documento do usuário na primeira vez que ele entra.
 * Roda depois da sessão já estar publicada no contexto: uma falha aqui
 * (regra do Firestore, rede) não pode impedir o acesso de quem se autenticou.
 */
const sincronizarPerfil = async (currentUser: User) => {
    try {
        const userRef = doc(db, "users", currentUser.uid);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
            await setDoc(userRef, {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                createdAt: Timestamp.now(),
            });
        }
    } catch (error) {
        console.error("Não foi possível sincronizar o perfil do usuário", error);
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                sincronizarPerfil(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
