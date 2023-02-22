// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxK9l1coY5mlRhHcCEe5wKhzO61ANnyi8",
  authDomain: "dlsontra-processmanagement.firebaseapp.com",
  projectId: "dlsontra-processmanagement",
  storageBucket: "dlsontra-processmanagement.appspot.com",
  messagingSenderId: "443641476008",
  appId: "1:443641476008:web:75725d73d3d1a0d3b5e39d",
  measurementId: "G-58M6PJVYJ2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);