import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";


var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const App = firebase.initializeApp(firebaseConfig);

// firebase storage
const projectStorage = App.storage();

// firebase firestore database
const projectFirestore = App.firestore();

// for store time at which a image was uploded 
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export  { projectFirestore, projectStorage, timestamp };


