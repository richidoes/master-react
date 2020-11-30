import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const  firebaseConfig = {
    apiKey: "AIzaSyA_4Y_zrVwn-3yU5YQbSQyFNEWCi6FWLjU",
    authDomain: "chat-14e0d.firebaseapp.com",
    databaseURL: "https://chat-14e0d.firebaseio.com",
    projectId: "chat-14e0d",
    storageBucket: "chat-14e0d.appspot.com",
    messagingSenderId: "858605603743",
    appId: "1:858605603743:web:78ef8c3e9a759c32ec8baa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

export {firebase, db, auth, provider}