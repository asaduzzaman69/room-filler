import firebase from "../lib/firebase";

export function isUserAdmin(user) {
    return new Promise((res) => {
        firebase.firestore().collection('admins').get().then((data) => {
            data.docs.forEach((doc) => {
                if (user.email === doc.data().email) { res(true); }
            })
            res(false);
        }).catch((err) => {
            res(false);
        });
    })
}