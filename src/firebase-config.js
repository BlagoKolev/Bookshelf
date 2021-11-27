import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApQhIVdgRumWc6zULMsRTZ15OvCJreCd4",
  authDomain: "bookshelf-3c638.firebaseapp.com",
  projectId: "bookshelf-3c638",
  storageBucket: "bookshelf-3c638.appspot.com",
  messagingSenderId: "348154374651",
  appId: "1:348154374651:web:f1a2837894bb9eae68835e"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);