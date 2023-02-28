
import * as firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDYqanKeWBvKWfVA_c87v9XrlgzUNp4pz4",
  authDomain: "briliproject.firebaseapp.com",
  projectId: "briliproject",
  storageBucket: "briliproject.appspot.com",
  messagingSenderId: "539937339121",
  appId: "1:539937339121:web:553ccbf09a39ab11b79b50",
  measurementId: "G-Q96EYH4SYV"
};

// Initialize Firebase
let app;
app = firebase.initializeApp(firebaseConfig);
export {app}

