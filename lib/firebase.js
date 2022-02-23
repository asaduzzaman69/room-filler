import firebase, { auth, firestore } from "firebase";

const config = {
    apiKey: "AIzaSyBopc3Qgx7AQ6FSIF48QuChEQu0a8-xArw",
    authDomain: "stay-stg.firebaseapp.com",
    projectId: "stay-stg",
    storageBucket: "stay-stg.appspot.com",
    messagingSenderId: "192108660517",
    appId: "1:192108660517:web:ec69363ac47c28cbf1bccc",
    measurementId: "G-7LLLMFD403"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firestore();
const authObject = auth();



function recaptchaVerifierVisible() {
    // [START auth_phone_recaptcha_verifier_visible]
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
        }
    });
    // [END auth_phone_recaptcha_verifier_visible]
}

export async function phoneSignIn(phoneNumber, setFirebaseOtp) {


    let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    await firebase.auth().signInWithPhoneNumber(phoneNumber, verify)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;

            setFirebaseOtp(confirmationResult)
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...

            console.log(error)
        });
    // [END auth_phone_signin]
}
export default firebase;