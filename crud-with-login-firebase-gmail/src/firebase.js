import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const  firebaseConfig = {
  apiKey: "AIzaSyDqTWN1wJ-alslJRTLAi2uuBPA4puo2SAs",
  authDomain: "crud-react-dca76.firebaseapp.com",
  databaseURL: "https://crud-react-dca76.firebaseio.com",
  projectId: "crud-react-dca76",
  storageBucket: "crud-react-dca76.appspot.com",
  messagingSenderId: "471829311668",
  appId: "1:471829311668:web:055fabca94bd279b3f27e1"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

  //export db and methods for auth
  const db = app.firestore()
  const auth = app.auth()

export {db, auth}