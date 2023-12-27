// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqBIJ1DXZ79EOQjU2XFG4Ss3yzvgGRUzI",
  authDomain: "shardmind.firebaseapp.com",
  projectId: "shardmind",
  storageBucket: "shardmind.appspot.com",
  messagingSenderId: "329639388117",
  appId: "1:329639388117:web:4996a93b045a3062da535c",
  measurementId: "G-8ZHBL2KCT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);






