import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
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

const handleSignOut = () => {
  firebase.auth().signOut().then( res => {
    const signOutUser = {
      signedIn: false,
      name:'',
      email:'',
      photo:''
    };
    setUser(signOutUser)
    });
  }
    const handleChange = (event) => {
      console.log(event.target.value)
    }
    
    // const signUpButton = document.getElementById('signUp');
    // const signInButton = document.getElementById('signIn');
    // const container = document.getElementById('container');
    
    // signUpButton.addEventListener('click', () => {
    //   container.classList.add("right-panel-active");
    // });
    
    // signInButton.addEventListener('click', () => {
    //   container.classList.remove("right-panel-active");
    // });
  return (
    <>
    <div>
       {/* {
         user.signedIn ? <button onClick={handleSignOut}>sign out</button> :
         <button className="form" onClick={handleClick}>sign in</button>
         }
      {
        user.signedIn && <div><p>welcome {user.name}</p>
        <p>Your Email: {user.email}</p> 
        <img src={user.photo} alt="" width="50%"/>
        </div> 
      } */}
      <form >
      <div class="container" id="container">
      	<div class="form-container sign-up-container">
	    	<form action="#">
			<h1>Create Account</h1>
			<div class="social-container">
      <FontAwesomeIcon icon={['fab', 'apple']} />
    <FontAwesomeIcon icon={['fab', 'microsoft']} />
    <FontAwesomeIcon icon={['fab', 'google']} />
			</div>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign Up</h1>
			<div class="social-container">
      <FontAwesomeIcon icon={['faFacebook', 'facebook']} />
    <FontAwesomeIcon icon={['fab', 'microsoft']} />
    <FontAwesomeIcon icon={['fab', 'google']} />
			</div>
			<span>use your account</span>
      <input type="text" placeholder="Your Email " onChange={handleChange} required/>
         <br/>
         <input type="password" name="" placeholder="Password"  required/>
         <br/>
         <input className="signInBtn" type="submit" value="submit"/>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
        {
         user.signedIn ? <button onClick={handleSignOut}>sign out</button> :
         <button onClick={handleClick}>sign in with Google</button>
         }
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

        {/* <input type="text" placeholder="ur email" onChange={handleChange} required/>
         <br/>
         <input type="password" name="" placeholder="password"  required/>
         <br/>
         <input className="form" type="submit" value="submit"/> */}
      </form>
    </div>
   </>
  );
}

export default App;
