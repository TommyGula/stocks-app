import firebase from 'firebase';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAXzilGcMFoENB4y4Z2NMimbWisrgEh4z8",
    authDomain: "gulaup.firebaseapp.com",
    projectId: "gulaup",
    storageBucket: "gulaup.appspot.com",
    messagingSenderId: "50980307257",
    appId: "1:50980307257:web:60d0c1cea033614a92e8e8",
    measurementId: "G-PB2NLBBYKW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth = firebase.auth();
  firebase.db = firebase.firestore();
  
  export default firebase;
  