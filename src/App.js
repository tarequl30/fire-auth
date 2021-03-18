import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import './App.css'
import firebaseConfig from './firebase.config'
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}
function App() {
  const [newUser, setNewUser] = useState(false)
  const [user , setUser] = useState({
    signedIn: false,
    name:'',
    email:'',
    password :'',
    photo:'',
  })
  var provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
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
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}
const handleFbSignIn = () => {
  firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    console.log('sign in' ,user) 
    var accessToken = credential.accessToken;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}
const handleSignOut = () => {
  firebase.auth().signOut().then( res => {
    const signOutUser = {
      signedIn: false,
      name:'',
      email:'',
      photo:'',
      error: '',
      success : false
    };
    setUser(signOutUser)
    });
  }
  const handleChange = (event) => {
     let isFormValid = true;
      if(event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
      }
      if(event.target.name === 'password') {
        const checkLength = event.target.value.length > 6;
        const validPass = /\d{1}/.test(event.target.value)
        isFormValid = checkLength && validPass;
      }
      if(isFormValid){
           const newUserInfo = {...user}
           newUserInfo[event.target.name] = event.target.value;
           setUser(newUserInfo);
      }
    }
  const handleSubmit = (event) => {
    if(newUser && user.email && user.password){
      firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
     .then((res) => {
       const newUserInfo = {...user}
       newUserInfo.error = '';
       newUserInfo.success = true;
       setUser(newUserInfo)
       updateUserInfo(user.name)
  })
  .catch((error) => {
    const newUserInfo = {...user}
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
  });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo)
        console.log("sign in user ", res.user)
      })
      .catch((error) => {
        const newUserInfo = {...user}
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
      });
    }
    event.preventDefault();
  }
const updateUserInfo = name => {
  var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name
      }).then(function() {
        console.log("updated")
      }).catch(function(error) {
        console.log(error)
      });
      }
return (
<>
  <div class="container">
    <div class="form-container sign-in-container">
	    <form >
        <h2>{newUser ? 'Sign Up' : 'Log In'}</h2>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="" id=""/> <label htmlFor="newUser">Click checkbox for Sign Up</label>
           {newUser && <input type="text" name='name' onBlur={handleChange} placeholder="name"/>}
            <br/>
            <input type="text" placeholder="Email" name='email' onBlur={handleChange} required/>
            <br/>
            <input type="password" placeholder="Password" name="password" onBlur={handleChange} required />
            <br/>
            <input onClick={handleSubmit} className="signInBtn" type="Submit" value={newUser ? "Sign Up" : "Log In"} />
            <p>{user.error}</p>
            {
              user.success && <p style={{color:"green"}}>user {newUser ? 'Created' : "logged In"} Successfuly</p> 
            }
	    </form>
    </div>
<div class="overlay-container">
	<div class="overlay">
		<div class="overlay-panel overlay-right">
			<h1>Hello, Friend!</h1>
			<p>Simply Click on Sign in with Google button to Login</p>
      {
         user.signedIn ? <button onClick={handleSignOut}>sign out</button> :
         <button onClick={handleClick}>sign in with Google</button>
         }
         <br/>
         <button onClick={handleFbSignIn}>Sign In with facebook</button>
      {
        user.signedIn && <div><p>welcome {user.name}</p>
        <p>Your Email: {user.email}</p> 
        <img src={user.photo} alt="" width="50%"/>
        </div> 
      }
		</div>
	</div>
</div>
</div>
</>
  );
}

export default App;
