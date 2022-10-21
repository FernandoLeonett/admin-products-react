import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcoSODl8H4Xq9ABdICP59ztS3UEzwrmNQ",
  authDomain: "admin-gregory-shop.firebaseapp.com",
  projectId: "admin-gregory-shop",
  storageBucket: "admin-gregory-shop.appspot.com",
  messagingSenderId: "16457513315",
  appId: "1:16457513315:web:f5de80afbeb15984257b56",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore( firebaseApp);
export const storage = getStorage(firebaseApp)

export const auth = getAuth(firebaseApp);


