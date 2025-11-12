import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsjCZrSwP5Qbu4NcHLG21K3jAZ8aeEQGY",
  authDomain: "skill-up-plus-app.firebaseapp.com",
  projectId: "skill-up-plus-app",
  storageBucket: "skill-up-plus-app.firebasestorage.app",
  messagingSenderId: "667836636349",
  appId: "1:667836636349:web:08111678fea357dd866bd4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);