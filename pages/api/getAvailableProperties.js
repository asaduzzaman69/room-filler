import {
    getAllProperties,
    getPropertyFutureCalendar,
} from "../../services/properties";


export default async (req, res) => {
    const propertiesRes = await getAllProperties();
    const properties = [];
    propertiesRes.forEach((property) => {
        properties.push(property.data());
    })
    if (isNaN(req.query.startDate) && isNaN(req.query.endDate)) {
        return res.json(properties);
    }
    const startDate = (new Date(parseInt(req.query.startDate))).toISOString().slice(0,10).replace(/-/g,"/");
    const endDate = (new Date(parseInt(req.query.endDate))).toISOString().slice(0,10).replace(/-/g,"/");
    const available = {};

    const promises = [];
    for (var x = 0; x < properties.length;) {
        console.log(properties.length)
        let property = properties[x];
        promises.push(new Promise((res) => {
            getPropertyFutureCalendar(property).then((dates) => {
                let dateAvailable = true;
                for (var y = 0; y < dates.length;) {
                    if ((startDate < dates[y].endDate && startDate > dates[y].startDate) || (endDate > dates[y].startDate && endDate < dates[y].endDate)) {
                        dateAvailable = false;
                    }
                    y++;
                }
                if (dateAvailable) {
                    available[property.id] = true;
                }
                res();
            })
        }))
        x++;
    }
    Promise.all(promises).then((results) => {
        console.log(available)
        res.json(properties.filter((property => available[property.id])));
    })
}