import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC67nCrzUbOvxkoM6DTfsD1umQBCtNVC8I",
  authDomain: "thewooders-45383.firebaseapp.com",
  projectId: "thewooders-45383",
  storageBucket: "thewooders-45383.firebasestorage.app",
  messagingSenderId: "61658658667",
  appId: "1:61658658667:web:a543236de7d90b24d6be2e",
  measurementId: "G-Q4L4155032"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();