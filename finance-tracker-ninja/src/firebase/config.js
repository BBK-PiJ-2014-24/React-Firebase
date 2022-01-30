import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore' 
import 'firebase/compat/auth'

// Config Settings
// ---------------
const firebaseConfig = {
    apiKey: "AIzaSyAN_D5GTFA_C9syiZ5e18Nj9zo6FZrt1F0",
    authDomain: "ninjamymoney.firebaseapp.com",
    projectId: "ninjamymoney",
    storageBucket: "ninjamymoney.appspot.com",
    messagingSenderId: "1065029285496",
    appId: "1:1065029285496:web:79db84b4ecf3382a7c5f8d"
  };

// Init Firebase
// -------------
firebase.initializeApp(firebaseConfig)

// Timestamp Variable
// ------------------
const timeStamp = firebase.firestore.Timestamp

// Init Various Firebase Services
// ----------------------
const projectFirestore = firebase.firestore(); // DB
const projectAuth = firebase.auth(); // Authorization with google generated JWT


export {projectFirestore, projectAuth, timeStamp}