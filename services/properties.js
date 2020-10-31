import firebase from "../lib/firebase";

export function updateProperty(property) {
    return firebase.firestore().collection('properties').doc(property.id).set(property)
}

export function uploadPropertyImages(files, propertyId) {
    console.log(files, files.length)
    return new Promise((res) => {
        const promises = [];
        for (var x = 0; x < files.length; x++) {
            promises.push(firebase.storage().ref().child('properties/' + propertyId + '/' + files[x].name).put(files[x]));
        }
        Promise.all(promises).then((data) => {
            const downloadUrlPromises = [];
            data.forEach((image) => {
                downloadUrlPromises.push(image.ref.getDownloadURL());
            })
            Promise.all(downloadUrlPromises).then((urls) => {
                res(urls);
            });
        });
    });
}

export function getAllProperties(id = null) {
    return firebase.firestore().collection('properties').get();
}

export function getUsersProperties(user = null) {
    return new Promise((res) => {
        Promise.all([
            firebase.firestore().collection('properties').where('createdBy', '==', user.uid).get(),
            firebase.firestore().collection('properties').where('owners', 'array-contains', user.email).get()
        ]).then((data) => {
            res([
                ...data[0].docs,
                ...data[1].docs
            ])
        });
    });
}