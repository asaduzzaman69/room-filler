import firebase from "../lib/firebase";

export function updateProperty(property) {
    return firebase.firestore().collection('properties').doc(property.id).set(property)
}

export function getAllProperties(id = null) {
    // Query firebase for properties and create routes with states/cities.
    return firebase.firestore().collection('properties').get();
}

export function getUsersProperties(user = null) {
    // Query firebase for properties and create routes with states/cities.
    return Promise.all([
        firebase.firestore().collection('properties').where('createdBy', '==', user.uid).get(),
        firebase.firestore().collection('properties').where('owners', 'array-contains', user.email)
    ]);
}