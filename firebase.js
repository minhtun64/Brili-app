import { initializeApp } from "firebase/app";
import { getDatabase, set, push } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBv1nl5EoP0sDzCwnod3UmuD5t8luEHAJE",
  authDomain: "briliproject-e99a9.firebaseapp.com",
  projectId: "briliproject-e99a9",
  storageBucket: "briliproject-e99a9.appspot.com",
  messagingSenderId: "1026103429669",
  appId: "1:1026103429669:web:facc3535cbca92709fcdcc",
  measurementId: "G-L2TJHPCLBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase cần sử dụng
const storage = getStorage(app);
const database = getDatabase(app);
// const auth = auth(app);

export { storage, database };
