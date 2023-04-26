// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCCpKFazo3iZvm9KlNMAYf9XikXtR7Ylo",
  authDomain: "uber-food-clone-a209f.firebaseapp.com",
  projectId: "uber-food-clone-a209f",
  storageBucket: "uber-food-clone-a209f.appspot.com",
  messagingSenderId: "825867378269",
  appId: "1:825867378269:web:cc9a22c614ca8750b937b4",
  measurementId: "G-TNNDC5CPDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
