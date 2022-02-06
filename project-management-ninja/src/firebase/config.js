import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// config
const firebaseConfig = {
    apiKey: "AIzaSyATUC2Guvv-RkWhSiqIjxS8HMxYyvfMt68",
    authDomain: "ninja-project-management.firebaseapp.com",
    projectId: "ninja-project-management",
    storageBucket: "ninja-project-management.appspot.com",
    messagingSenderId: "108953911762",
    appId: "1:108953911762:web:89a7f10356a0406bd7c80b"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// import timestamp f()
const timestamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, projectStorage, timestamp}