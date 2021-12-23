importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyCsO831sK1P0mQ8MaD8DmJnAnmFtn9-0r4",
  authDomain: "light-restaurant.firebaseapp.com",
  projectId: "light-restaurant",
  storageBucket: "light-restaurant.appspot.com",
  messagingSenderId: "778813802595",
  appId: "1:778813802595:web:540b4f315adf5f36875056",
  measurementId: "G-6B3ZYN5KP9"
});

const messaging = firebase.messaging();
