// Setting up the FIREBASE locally in our project npm i firebase
// then this config file

import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDVXjWE3SdS7rYDrqsMjRlVTCGFT-LXtec",
    authDomain: "muso-music-playlist.firebaseapp.com",
    projectId: "muso-music-playlist",
    storageBucket: "muso-music-playlist.appspot.com",
    messagingSenderId: "405418553116",
    appId: "1:405418553116:web:0db39c2e702b47154f94d9"
};


//init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()


//timestamp, time of the added data
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { projectFirestore, projectAuth, projectStorage, timestamp }