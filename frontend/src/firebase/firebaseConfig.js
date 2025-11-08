// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJSOU39_i5mBcR41S-Y3jSG15m-96sNc4",
  authDomain: "grapholyze-68644.firebaseapp.com",
  projectId: "grapholyze-68644",
  storageBucket: "grapholyze-68644.appspot.com",
  messagingSenderId: "74066285164",
  appId: "1:74066285164:web:2b97ce306cb6c2f5f8fe49",
  measurementId: "G-5QCY7Y7NJP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
