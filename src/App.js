
import './App.css';
import firebaseConfig from './firebase.config'
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);


function App() {
  const [user , setUser] = useState({
    signedIn: false,
    name:'',
    email:'',
    photo:''
  })
  var provider = new firebase.auth.GoogleAuthProvider();
  
  const handleClick = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const {displayName, photoURL, email} = result.user;
      const signedInUser = {
            signedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
      }
      setUser(signedInUser);
       console.log(displayName, photoURL, email)
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
 
}
  return (
    <div className="App">
       <button onClick={handleClick}>sign in</button>
      {
        user.signedIn && <div><p>welcome {user.name}</p>
        <p>Your Email: {user.email}</p> 
        <img src={user.photo} alt="" width="100%"/>
        </div> 
      }
    </div>
  );
}

export default App;
