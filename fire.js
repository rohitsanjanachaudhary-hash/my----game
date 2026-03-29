import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGt19e8F6E7osZh9FZGvjd6qfk_Oc8C6g",
  authDomain: "fantasy--game--pro.firebaseapp.com",
  projectId: "fantasy--game--pro",
  storageBucket: "fantasy--game--pro.firebasestorage.app",
  messagingSenderId: "743543189357",
  appId: "1:743543189357:web:b01c334fc23bd84db1f464"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
console.log("Firebase connected successfully");
