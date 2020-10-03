import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBvAtC-7zGIIwmUYcieZnLlJbbYy31NaME",
    authDomain: "room-filler-engine.firebaseapp.com",
    databaseURL: "https://room-filler-engine.firebaseio.com",
    projectId: "room-filler-engine",
    storageBucket: "room-filler-engine.appspot.com",
    messagingSenderId: "183523875329",
    appId: "1:183523875329:web:4df1c27cee7efff118be00"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;