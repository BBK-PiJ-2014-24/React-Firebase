import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBnahW-P5erJftL63ZayDh9A8bJMKHA2Xw",
    authDomain: "ninjacookingsite.firebaseapp.com",
    projectId: "ninjacookingsite",
    storageBucket: "ninjacookingsite.appspot.com",
    messagingSenderId: "225340279143",
    appId: "1:225340279143:web:67e18b850d3b2aefdfc7c2"
  };


  // init firebase
  firebase.initializeApp(firebaseConfig);

  // init services
  const projectFirestore =  firebase.firestore();


export { projectFirestore };