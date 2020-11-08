import icsToJson from "ics-to-json";
import {getAllProperties, updatePropertyCalendar} from "../../services/properties";

function getFormattedDate(date) {
    return date.includes('/') ? date : `${date.substring(0, 4)}/${date.substring(4, 6)}/${date.substring(6)}`
}

export default async (req, res) => {
    const propertiesRes = await getAllProperties();
    const properties = [];
    propertiesRes.forEach((property) => {
        properties.push(property.data());
    })
    const responses = {};
    for (var x = 0; x < properties.length;) {
        let property = properties[x];
        const airbnbCalendarRes = await fetch(property.airbnbCalendarURL);
        const vrboCalendarRes = await fetch(property.vrboCalendarURL);
        const airbnbCalendarText = await airbnbCalendarRes.text();
        const vrboCalendarText = await vrboCalendarRes.text();
        const airbnbData = icsToJson(airbnbCalendarText).map(data => ({...data, startDate: getFormattedDate(data.startDate), endDate: getFormattedDate(data.endDate), platform: 'airbnb'}));
        const vrboData = icsToJson(vrboCalendarText).map(data => ({...data, startDate: getFormattedDate(data.startDate), endDate: getFormattedDate(data.endDate), platform: 'vrbo'}));
        const response = await updatePropertyCalendar(property, airbnbData, vrboData);
        responses[property.id] = response;
        x++;
    }
    res.end(JSON.stringify(responses));
}