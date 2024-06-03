// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClyaG7fRcEBjAJaVb7F02s3N5mI9KmhBg",
  authDomain: "meu-projeto-lb666.firebaseapp.com",
  projectId: "meu-projeto-lb666",
  storageBucket: "meu-projeto-lb666.appspot.com",
  messagingSenderId: "366854780702",
  appId: "1:366854780702:web:049e60ccbd13d802983b0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const bancoExterno=getFirestore(app);
export {bancoExterno};