// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAM2gqyKr1FszRZPRWpGDf5Jcp1Df1T5I",
  authDomain: "file-storage-8f772.firebaseapp.com",
  projectId: "file-storage-8f772",
  storageBucket: "file-storage-8f772.appspot.com",
  messagingSenderId: "370679500317",
  appId: "1:370679500317:web:f63a93323c5561e1f480f4"
};

// Initialize Firebase
const storage = initializeApp(firebaseConfig);
export default storage;