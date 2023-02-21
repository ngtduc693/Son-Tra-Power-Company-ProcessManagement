// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxK9l1coY5mlRhHcCEe5wKhzO61ANnyi8",
  authDomain: "dlsontra-processmanagement.firebaseapp.com",
  projectId: "dlsontra-processmanagement",
  storageBucket: "dlsontra-processmanagement.appspot.com",
  messagingSenderId: "443641476008",
  appId: "1:443641476008:web:75725d73d3d1a0d3b5e39d",
  measurementId: "G-58M6PJVYJ2"
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);