// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqOA2z45rOlJCtC8gOvroQxGeQlnFZIuM",
  authDomain: "job-spring-demo.firebaseapp.com",
  projectId: "job-spring-demo",
  storageBucket: "job-spring-demo.appspot.com",
  messagingSenderId: "369607950468",
  appId: "1:369607950468:web:15cba17bd1d5339820c2d1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Export auth so it can be imported in other files
export { auth };
