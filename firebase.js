// initializing the firebase 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrLx98fBlCfkpDGhzBRx7ejP5liNev8e0",
  authDomain: "microvault-23a97.firebaseapp.com",
  projectId: "microvault-23a97",
  storageBucket: "microvault-23a97.appspot.com",
  messagingSenderId: "732465677460",
  appId: "1:732465677460:web:524ee0aae6fc39b2302081",
  measurementId: "G-1CK152XPZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };