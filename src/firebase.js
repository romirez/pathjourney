import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'


// Your web app's Firebase configuration
const config = {
  apiKey: process.env.VUE_APP_FIREBASEAPIKEY,
  authDomain: process.env.VUE_APP_FIREBASEAUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASEDBURL,
  projectId: process.env.VUE_APP_FIREBASEPROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASEMESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASEAPPID
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(config);
export const firestore = firebase.firestore();
export const firestorage = firebase.storage();