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
  signIn: (email: string, password: string) => Promise<UserType | null>;
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
          const now = new Date();
          const formattedDate = now.toLocaleDateString("pt-BR");

          const newUser: UserType = {
            id: firebaseUser.uid,
            username: firebaseUser.displayName || "",
            email: firebaseUser.email || "",
            accountCreationDate: formattedDate,
            isAuthenticated: true,
            userJourney: {
              amountStreakDays: 0,
              amountTotalAccessDays: 0,
              amountFinishedCourses: 0,
              amountChatMessages: 0,
              userPoints: 0,
            },
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

      const now = new Date();
      const formattedDate = now.toLocaleDateString("pt-BR");

      const newUser: UserType = {
        id: cred.user.uid,
        username,
        email,
        accountCreationDate: formattedDate,
        isAuthenticated: false,
        userJourney: {
          amountStreakDays: 0,
          amountTotalAccessDays: 0,
          amountFinishedCourses: 0,
          amountChatMessages: 0,
          userPoints: 0,
        },
      };
      
      await setDoc(doc(db, "users", cred.user.uid), newUser);
      await saveUser(newUser);
      setUser(newUser);
    } catch (error: any) {
      console.error("Erro no signUp:", error.code, error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<UserType | null> => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const existingUser = await getUser(cred.user.uid);

      if (existingUser) {
        const now = new Date();
        const today = now.toLocaleDateString("pt-BR");

        let { amountStreakDays, amountTotalAccessDays } = existingUser.userJourney;
        const lastLoginDate = existingUser.lastAccessDate;

        if (!lastLoginDate) {
          amountStreakDays = 1;
          amountTotalAccessDays = 1;
        } else {
          const [dia, mes, ano] = lastLoginDate.split("/").map(Number);
          const lastLogin = new Date(ano, mes - 1, dia);

          const diffInDays = Math.floor(
            (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (diffInDays === 1) {
            amountStreakDays += 1;
            amountTotalAccessDays += 1;
          } else if (diffInDays > 1) {
            amountStreakDays = 1;
            amountTotalAccessDays += 1;
          }
        }

        const updatedUser: UserType = {
          ...existingUser,
          isAuthenticated: true,
          lastAccessDate: today,
          userJourney: {
            ...existingUser.userJourney,
            amountStreakDays,
            amountTotalAccessDays,
          },
        };

        await setDoc(doc(db, "users", cred.user.uid), updatedUser, { merge: true });
        await saveUser(updatedUser);
        setUser(updatedUser);
        return updatedUser;
      }
      return null;
    } catch (error) {
      console.error("Erro ao logar:", error);
      return null;
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