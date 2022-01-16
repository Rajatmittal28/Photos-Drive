import React from 'react'
import Intro from './Intro'
import firebase from "firebase";

export default function LoginPage() {

    // setting up google authentication functionlity
    const handleClick = (e) => {
        var userid;
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                userid = user.uid;
            })
            .catch((error) => {
                console.log(error);
            }
        ); 
        return userid;  
    }

    return (
        <div>
            <nav className="navbar  navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Image Drive App</a>
                    <button className="btn btn-primary me-md-2" onClick={handleClick}>Login By Google</button>
                </div>
            </nav>
            <Intro />
        </div>
    )
}

