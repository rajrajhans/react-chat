import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import firestore from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyAsHsugVI93H4j_mgxlxxaQ4DboJnkBKqM",
    authDomain: "react-chat-da471.firebaseapp.com",
    databaseURL: "https://react-chat-da471.firebaseio.com",
    projectId: "react-chat-da471",
    storageBucket: "react-chat-da471.appspot.com",
    messagingSenderId: "547622558845",
    appId: "1:547622558845:web:518f8dbddc665a6c8ae514",
    measurementId: "G-S4NPYR0ML0"
});

ReactDOM.render(<div>Hello World</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
