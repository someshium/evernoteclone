import firebase from 'firebase/app';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAyTwSiLI_rAtD0p9ycBUX3iVZUaMtkJYU",
    authDomain: "evernoteclone-55925.firebaseapp.com",
    projectId: "evernoteclone-55925",
    storageBucket: "evernoteclone-55925.appspot.com",
    messagingSenderId: "1010930621591",
    appId: "1:1010930621591:web:b93e5ae17b00eaaee3ddd2",
    measurementId: "G-1YFN8VL5T3"
  };
  
  firebase.initializeApp(firebaseConfig);


  const projectFirestore = firebase.firestore();
  
  export {projectFirestore} ;