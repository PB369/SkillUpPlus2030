import { auth } from '@/config/firebase';
import { UserType } from '@/utils/types/userType';
import { getUser, saveUser } from '@/utils/userHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  changeUserProperty: (property: keyof UserType, value: string | number | boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = '@user_data';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const existingUser = await getUser(firebaseUser.uid);
          if (existingUser) {
            setUser(existingUser);
          } else {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('pt-BR');

            const newUser: UserType = {
              id: firebaseUser.uid,
              username: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
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
        } catch (error) {
          Alert.alert('Erro', `Falha ao carregar usuário: ${error}`);
        }
      } else {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) saveUser(user);
  }, [user]);

  const changeUserProperty = (property: keyof UserType, value: any) => {
    if (!user) return;
    setUser({ ...user, [property]: value });
  };

  return (
    <UserContext.Provider value={{ user, setUser, changeUserProperty }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve estar dentro de UserProvider');
  return context;
};