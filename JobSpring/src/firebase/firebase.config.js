// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: " ",
  authDomain: " ",
  projectId: "job-spring-demo",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: " "
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//  Export auth so it can be imported in other files
export { auth };
