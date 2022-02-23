import {
  getAllProperties,
  getPropertyFutureCalendar
} from "../../services/properties";



const getFormattedDate = (unix) => {
  const newDateObj = new Date(unix);
  const year = newDateObj.getFullYear();
  const month = newDateObj.getMonth();
  const date = newDateObj.getDate();

  return `${year}/${month + 1}/${date}`
}


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

  const startDate = getFormattedDate(parseInt(req.query.startDate))
  const endDate = getFormattedDate(parseInt(req.query.endDate));

  const available = {};



  const promises = [];
  for (var x = 0; x < properties.length; ) {
    let property = properties[x];
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
    res.json(properties.filter(property => available[property.id]));
  });
};

/* 
  SEPT 1 - 7
  PROPERTY 2 - 6
  IF startdate is less then property endDate and also startDate is Greater then property startDate || endDate is greater then startDate and endDate is less then property end Date
*/