import { db } from "@/config/firebase";
import { UserType } from "@/utils/types/userType";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

export async function createUser(uid: string, userData: UserType) {
  await setDoc(doc(usersCollection, uid), {
    ...userData,
    createdAt: new Date(),
  });
}

export async function getUser(uid: string) {
  const snapshot = await getDoc(doc(usersCollection, uid));
  if (snapshot.exists()) return snapshot.data() as UserType;
  return null;
}

export async function updateUser(uid: string, data: Partial<UserType>) {
  await updateDoc(doc(usersCollection, uid), data);
}

export async function deleteUser(uid: string) {
  await deleteDoc(doc(usersCollection, uid));
}