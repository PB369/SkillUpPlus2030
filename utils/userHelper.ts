import { db } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserType } from "./types/userType";

const USER_KEY = "@user_data";

export const saveUser = async (user: UserType): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await setDoc(doc(db, "users", user.id), user);
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
};

export const getUser = async (userId?: string): Promise<UserType | null> => {
  try {
    if (userId) {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return docSnap.data() as UserType;
    }

    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
  }
};