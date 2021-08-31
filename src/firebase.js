import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyDUCsZT5Um48jQe6jjkk05O7jO2ffYirQM",
    authDomain: "adopte-un-sup.firebaseapp.com",
    projectId: "adopte-un-sup",
    storageBucket: "adopte-un-sup.appspot.com",
    messagingSenderId: "567755539903",
    appId: "1:567755539903:web:b7b8423211d56af5f18d0a"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();