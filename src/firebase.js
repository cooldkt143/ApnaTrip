import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDehHHaiZ5CoI8zrwn3EUwlDx3-vSoY_w",
  authDomain: "apnatrip-8ee03.firebaseapp.com",
  projectId: "apnatrip-8ee03",
  storageBucket: "apnatrip-8ee03.firebasestorage.app",
  messagingSenderId: "792264248352",
  appId: "1:792264248352:web:96cbb2cd030dbb2d888045",
  measurementId: "G-15PCVHSYHL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();