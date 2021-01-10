import {
  getAllProperties,
  getPropertyFutureCalendar
} from "../../services/properties";

export default async (req, res) => {
  const propertiesRes = await getAllProperties();
  const properties = [];
  propertiesRes.forEach(property => {
    if (property.data().published) {
      properties.push(property.data());
    }
  });
  if (
    isNaN(parseInt(req.query.startDate)) &&
    isNaN(parseInt(req.query.endDate))
  ) {
    return res.json(properties);
  }
  const startDate = new Date(parseInt(req.query.startDate))
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "/");
  const endDate = new Date(parseInt(req.query.endDate))
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "/");
  const available = {};

  const promises = [];
  for (var x = 0; x < properties.length; ) {
    let property = properties[x];
    console.log(property.maxOccupancy, req.query.guests);
    if (
      parseInt(property.maxOccupancy) < parseInt(req.query.guests) ||
      !property.published
    ) {
      x++;
    } else {
      promises.push(
        new Promise(res => {
          getPropertyFutureCalendar(property).then(dates => {
            let dateAvailable = true;
            for (var y = 0; y < dates.length; ) {
              if (
                (startDate < dates[y].endDate &&
                  startDate > dates[y].startDate) ||
                (endDate > dates[y].startDate && endDate < dates[y].endDate)
              ) {
                dateAvailable = false;
              }
              y++;
            }
            if (dateAvailable) {
              available[property.id] = true;
            }
            res();
          });
        })
      );
      x++;
    }
  }
  Promise.all(promises).then(results => {
    console.log(available);
    res.json(properties.filter(property => available[property.id]));
  });
};
