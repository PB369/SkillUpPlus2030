import { auth, db } from "@/config/firebase";
import { UserType } from "@/utils/types/userType";
import { getUser, removeUser, saveUser } from "@/utils/userHelper";
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOutUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await getUser(firebaseUser.uid);
        if (userData) setUser(userData);
        else {
          const newUser: UserType = {
            id: firebaseUser.uid,
            username: firebaseUser.displayName || "",
            email: firebaseUser.email || "",
            isAuthenticated: true,
          };
          await saveUser(newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      const newUser = {
        id: cred.user.uid,
        username,
        email,
        isAuthenticated: true,
        isFirstAccess: true,
      };
      
      await setDoc(doc(db, "users", cred.user.uid), newUser);
      await saveUser(newUser);
      setUser(newUser);
    } catch (error: any) {
      console.error("Erro no signUp:", error.code, error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const existingUser = await getUser(cred.user.uid);
      if (existingUser) {
        const loggedUser = { ...existingUser, isAuthenticated: true };
        await saveUser(loggedUser);
        setUser(loggedUser);
        return true;
      }
      console.log("existingUser: ", existingUser)
      return false;
    } catch (error) {
      console.error("Erro ao logar:", error);
      return false;
    }
  };

  const signOutUser = async () => {
    if (user) await removeUser();
    await signOut(auth);
    setUser(null);
  };

  const deleteAccount = async () => {
    if (auth.currentUser) {
      await deleteDoc(doc(db, "users", auth.currentUser.uid));
      await deleteUser(auth.currentUser);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOutUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};