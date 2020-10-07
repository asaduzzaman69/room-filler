import firebase from "../lib/firebase";

let user = firebase.auth.user;

export function getUserProfile() {
    // Query firebase for properties and create routes with states/cities.
    return user;
}