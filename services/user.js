import firebase from "../lib/firebase";

let user = firebase.auth.user || null;

export async function getUser() {
    return user;
}