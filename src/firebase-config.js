import { initializeApp } from "firebase/app";   //Get reference to Firebase
import { getFirestore } from '@firebase/firestore';   //Get reference to Firebase firestorage (json data storage);
import { getStorage } from 'firebase/storage';  //Get reference to Firebase file storage;
import { getAuth } from 'firebase/auth';  //Get reference to Firebase authentication services

const firebaseConfig = {
  apiKey: "AIzaSyApQhIVdgRumWc6zULMsRTZ15OvCJreCd4",
  authDomain: "bookshelf-3c638.firebaseapp.com",
  projectId: "bookshelf-3c638",
  storageBucket: "bookshelf-3c638.appspot.com",
  messagingSenderId: "348154374651",
  appId: "1:348154374651:web:f1a2837894bb9eae68835e"
};


const app = initializeApp(firebaseConfig);  //Initialize (register our App to) Firebase;
export const db = getFirestore(app);   //Initialize out json data DB in Firebase;
export const auth = getAuth(app);   //Initialize authentication services from Firebase;
export const storage = getStorage(app);   //Initialize our file storage from Firebase