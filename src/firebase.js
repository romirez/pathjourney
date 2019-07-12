import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'


// Your web app's Firebase configuration
const config = {
  apiKey: "***REMOVED***",
  authDomain: "pathjourney-sypath.firebaseapp.com",
  databaseURL: "https://pathjourney-sypath.firebaseio.com",
  projectId: "pathjourney-sypath",
  storageBucket: "pathjourney-sypath.appspot.com",
  messagingSenderId: "1047338707072",
  appId: "1:1047338707072:web:b65cb26cc20c8e8a"
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const firestorage = firebase.storage();