import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4BR16zkxOGY7Mb0vCKpX_rdqdJQ1wgRo",
  authDomain: "skill-up-plus-2030.firebaseapp.com",
  projectId: "skill-up-plus-2030",
  storageBucket: "skill-up-plus-2030.firebasestorage.app",
  messagingSenderId: "916209180619",
  appId: "1:916209180619:web:a9bb22fb9f6f37fa8ba04e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);