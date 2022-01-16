import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './comps/HomePage';
import LoginPage from './comps/LoginPage';
import firebase from "firebase";

function App() {

  const [userSignedin, setUserSignedIn] = useState(false);

  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      setUserSignedIn(true);
    }
    else{
      setUserSignedIn(false);
    }
  });

  return (
    <Router>
      <Switch>
        { userSignedin === true 
         ? <Route exact path="/" component={HomePage} />
         : <Route exact path="/" component={LoginPage} />
        }
      </Switch>
    </Router>
  );
  
}

export default App;
