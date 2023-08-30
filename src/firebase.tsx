// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKPDBJpnkuswzixjnQZMeb1Xe-o4zv1bM",
  authDomain: "auth-sign-up-shopping.firebaseapp.com",
  projectId: "auth-sign-up-shopping",
  storageBucket: "auth-sign-up-shopping.appspot.com",
  messagingSenderId: "886233970652",
  appId: "1:886233970652:web:025c79051122fd407cc119"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage(app)
export const db = getFirestore(app)


