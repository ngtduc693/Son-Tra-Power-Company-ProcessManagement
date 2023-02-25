// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const addData = async (documentName, data) => {
  try {
    const collectionRef = db.collection(documentName);
    const docRef = await collectionRef.add(data);
    console.log(`Tài liệu đã được thêm thành công với ID: ${docRef.id}`);
  } catch (error) {
    console.error('Lỗi khi thêm tài liệu: ', error);
  }
};