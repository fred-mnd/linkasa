// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGZGundIAUZ6uqlmSOjk6IQU74dy2d6n0",
  authDomain: "linkasa-48af0.firebaseapp.com",
  projectId: "linkasa-48af0",
  storageBucket: "linkasa-48af0.appspot.com",
  messagingSenderId: "281644862801",
  appId: "1:281644862801:web:78632d8b04ee34b82b1770",
  measurementId: "G-84GP5DXEN8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
