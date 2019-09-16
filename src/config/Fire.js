import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBwKWpNMDOehbHCQRz4A98ke9OeSSNMo-4",
  authDomain: "calendar-7358b.firebaseapp.com",
  databaseURL: "https://calendar-7358b.firebaseio.com",
  projectId: "calendar-7358b",
  storageBucket: "calendar-7358b.appspot.com",
  messagingSenderId: "635077406322"
};

const fire = firebase.initializeApp(config);

export default fire;
