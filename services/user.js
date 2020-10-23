import firebase from "../lib/firebase";

export function isUserAdmin(user) {
    return user.email === 'trawick84@gmail.com';
}