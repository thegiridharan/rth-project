import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_xLndIgTBc7tQwJfkWIFFOJBoi04doF4",
    authDomain: "rth-project-9a5e2.firebaseapp.com",
    projectId: "rth-project-9a5e2",
    storageBucket: "rth-project-9a5e2.firebasestorage.app",
    messagingSenderId: "511771965201",
    appId: "1:511771965201:web:305217cfface67f98bfeb0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

/** // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_xLndIgTBc7tQwJfkWIFFOJBoi04doF4",
  authDomain: "rth-project-9a5e2.firebaseapp.com",
  projectId: "rth-project-9a5e2",
  storageBucket: "rth-project-9a5e2.firebasestorage.app",
  messagingSenderId: "511771965201",
  appId: "1:511771965201:web:305217cfface67f98bfeb0",
  measurementId: "G-V70T5BRBNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */