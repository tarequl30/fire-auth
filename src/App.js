
import './App.css';
import firebaseConfig from './firebase.config'
import firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

function App() {
  const handleClick = () => {
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
  console.log(result)
  });

  }
  var provider = new firebase.auth.GoogleAuthProvider();
  

  return (
    <div className="App">
       <button onClick={handleClick}>sign in</button>
    </div>
  );
}

export default App;
