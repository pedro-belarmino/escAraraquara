import { createContext, useState, useEffect, ReactNode } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { User, Role, AuthorizedEmail } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          // This is an inconsistent state. The user is authenticated with Firebase
          // but doesn't have a user profile in our system. We should log them out.
          console.warn("User authenticated with Firebase but no user document found. Logging out.");
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const email = firebaseUser.email;

      if (!email) {
        throw new Error("Email não encontrado.");
      }

      // 1. Domain validation
      if (!email.endsWith("@escoteiros.org.br")) {
        await signOut(auth);
        throw new Error("Apenas emails com o domínio @escoteiros.org.br são permitidos.");
      }

      // 2. Authorized email validation
      const authorizedEmailDoc = await getDoc(doc(db, "authorizedEmails", email));

      if (!authorizedEmailDoc.exists()) {
        await signOut(auth);
        throw new Error("Este email não está autorizado a acessar o sistema.");
      }

      const authorizedEmailData = authorizedEmailDoc.data() as AuthorizedEmail;

      const userToSet: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || "Usuário sem nome",
        role: authorizedEmailData.role,
      };

      // Store this user object in the 'users' collection to persist their role and data
      await setDoc(doc(db, "users", userToSet.uid), userToSet, { merge: true });

      setUser(userToSet);

    } catch (error) {
      console.error("Erro no login:", error);
      // Ensure user is signed out in Firebase if any part of the custom validation fails
      await signOut(auth);
      setUser(null);
      // Re-throw the error to be caught by the UI
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};