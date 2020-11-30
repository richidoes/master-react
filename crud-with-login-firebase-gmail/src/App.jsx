import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Admin from './components/Admin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Recover from './components/Recover';
import { auth } from './firebase';

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    //register user changes 
    auth.onAuthStateChanged(user => {
        console.log(user)

        if(user){
            setFirebaseUser(user)
        }else{
            setFirebaseUser(null)
        }
    })

}, [])

  return firebaseUser !== false ?(
    <Router>
        <div className="container">
        <Navbar firebaseUser={firebaseUser}/>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/recover">
            <Recover />
          </Route>
          <Route path="/">
            Inicio...
          </Route>
        </Switch>
      </div>
    </Router>
    
  ) : (
    <p>Cargardo...</p>
  )
}

export default App;
