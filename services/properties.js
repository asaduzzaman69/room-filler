import firebase from "../lib/firebase";

export function updateProperty(property) {
    return firebase.firestore().collection('properties').doc(property.id).set(property)
}

export function uploadPropertyImages(files, propertyId) {
    return new Promise((res) => {
        const promises = [];
        for (var x = 0; x < files.length;) {
            if (typeof files[x] !== 'string' && !(files[x] instanceof String)) {
                promises.push(firebase.storage().ref().child('properties/' + propertyId + '/' + Date.now() + '.jpg').put(files[x]));
            } else if (files[x].includes('data:')) {
                promises.push(firebase.storage().ref().child('properties/' + propertyId + '/' + Date.now() + '.jpg').putString(files[x], 'data_url'));
            }
            x++;
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

export function getAllProperties() {
    return firebase.firestore().collection('properties').get();
}

export function getAvailableProperties(startDate, endDate) {
    return fetch('http://localhost:3000/api/getAvailableProperties?startDate=' + startDate + '&endDate=' + endDate);
}

export function getSingleProperty(id = null) {
    return firebase.firestore().collection('properties').doc(id).get();
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

export function getPropertyFirstImage(property) {
    if (property && property.images) {
        return property.images[0];
    }
    return  'https://via.placeholder.com/150';
}

export function dateInFuture(date) {
    return new Date(date) >= new Date().setHours(0,0,0,0)
};

export function bookedOrPastDates(date, reservations) {
    if (new Date(date) < new Date().setHours(0,0,0,0)) { return true; }
    let dateBooked = false;
    reservations.forEach((reserved) => {
        if (new Date(reserved.startDate) <= new Date(date) && new Date(date) <= new Date(reserved.endDate)) { dateBooked = true; }
    })
    return dateBooked;
}

export function getPropertyCalendar(property) {
    return firebase.firestore().collection('calendar').doc(property.id).get();
}

export function getPropertyFutureCalendar(property) {
    const today = (new Date()).toISOString().slice(0,10).replace(/-/g,"/");
    return new Promise(async (res, rej) => {
        try {
            let calendar = await firebase.firestore().collection('calendar').doc(property.id).get();
            const newDates = [];
            const dates = (calendar.data()).dates;
            dates.forEach((date) => {
                if (date.endDate > today) {
                    newDates.push(date);
                }
            })
            res(dates)
        } catch(e) {
            rej(e);
        }
    });
}

export async function updatePropertyCalendar(property, airbnbData, vrboData) {
    return new Promise(async (res, rej) => {
        try {
            // Get calendar data.
            let calendar = await firebase.firestore().collection('calendar').doc(property.id).get();
            calendar = calendar.data() || {dates: [...airbnbData, ...vrboData]};
            // Check for cancellations and mark as cancelled if non existent in new calendar data.
            calendar.dates.forEach((date) => {
                if (date.status !== 'canceled' && dateInFuture(date.startDate) && (
                        (date.platform === 'airbnb' && airbnbData.filter(e => e.startDate === date.startDate && e.endDate === date.endDate).length === 0) ||
                        (date.platform === 'vrbo' && vrboData.filter(e => e.startDate === date.startDate && e.endDate === date.endDate).length === 0)
                    )
                ) {
                    date.status = 'canceled';
                }
            })
            airbnbData.forEach((date) => {
                if (calendar.dates.filter(e => e.startDate === date.startDate && e.endDate === date.endDate).length === 0) { calendar.dates.push(date); }
            })
            vrboData.forEach((date) => {
                if (calendar.dates.filter(e => e.startDate === date.startDate && e.endDate === date.endDate).length === 0) { calendar.dates.push(date); }
            })
            await firebase.firestore().collection('calendar').doc(property.id).set({
                dates: calendar.dates
            }, {merge: true});
            res('Completed');
        } catch (e) {
            rej(e);
        }
    })
}