// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// web app's Firebase configuratio
const firebaseConfig = {
  apiKey: "AIzaSyCBHk5T5x9eCR8Du1iRHK347zyUCVxspFA",
  authDomain: "crms-a8fa8.firebaseapp.com",
  projectId: "crms-a8fa8",
  storageBucket: "crms-a8fa8.appspot.com",
  messagingSenderId: "314295375081",
  appId: "1:314295375081:web:f6b0f617b5ee8ca9cbcc78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage;
export {app};