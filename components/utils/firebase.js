// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP_MSWYkzauNyhdSOmSjumCyjDGZ-3IlQ",
  authDomain: "consultasinstituto-bed36.firebaseapp.com",
  projectId: "consultasinstituto-bed36",
  storageBucket: "consultasinstituto-bed36.appspot.com",
  messagingSenderId: "4304772022",
  appId: "1:4304772022:web:e4836079ca85a6cbe67f17"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase; 