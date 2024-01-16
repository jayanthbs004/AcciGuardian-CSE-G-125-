import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD2g_Z2Zs_RJr62q9--Onaj86E8YwxisCc",
  authDomain: "crimealert-34f86.firebaseapp.com",
  projectId: "crimealert-34f86",
  storageBucket: "crimealert-34f86.appspot.com",
  messagingSenderId: "354372183829",
  appId: "1:354372183829:web:3b887f3ddbf5b3fd96eb1c",
  measurementId: "G-ZJH271R35Y"
});

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


  export {db, auth, storage};