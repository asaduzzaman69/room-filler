import firebase from "../lib/firebase";

export function getAllProperties(id = null) {
    // Query firebase for properties and create routes with states/cities.
    return firebase.firestore().collection('properties').get();
}