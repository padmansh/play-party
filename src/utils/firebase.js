import firebase from "firebase/app";
import "@firebase/database";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQSzImuiO7xbGZ7cNtop2yyv6BL4vXYho",
  authDomain: "play-party-78f82.firebaseapp.com",
  projectId: "play-party-78f82",
  storageBucket: "play-party-78f82.appspot.com",
  messagingSenderId: "874295378327",
  appId: "1:874295378327:web:db3671958fa8d4ddf544d2",
  measurementId: "G-0VBQGMKFZZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
