import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        if (!firebaseUser.email?.endsWith('@escoteiros.org.br')) {
          setUser(null);
          await firebaseSignOut(auth);
          alert('Acesso negado. Apenas e-mails com o domínio @escoteiros.org.br são permitidos.');
          setLoading(false);
          return;
        }

        const userDocRef = doc(db, 'authorized-emails', firebaseUser.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName || 'Usuário',
            role: userData.role as Role,
            photoURL: firebaseUser.photoURL || '',
            branch: userData.branch,
          });
        } else {
          setUser(null);
          await firebaseSignOut(auth);
          alert('Acesso negado. Seu e-mail não está na lista de e-mails autorizados.');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};