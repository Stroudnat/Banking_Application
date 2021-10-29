import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_eJ8p_mBjhWIjKqiRQ9_N6KMHiPHOyus",
    authDomain: "bankingapp-5727f.firebaseapp.com",
    projectId: "bankingapp-5727f",
    storageBucket: "bankingapp-5727f.appspot.com",
    messagingSenderId: "832424147274",
    appId: "1:832424147274:web:a634f23857dc520aaf69b3"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  export default auth;