const request = require("request");
const constans = require("../config");

const weatherData = (address, callback) => {
  const url =
    constans.openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&appid=" +
    constans.openWeatherMap.SECRET_KEY;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't fetch data from open weather map api", undefined);
    } else {
      callback(undefined, {
        temperature: (body.main.temp - 32) / 1.8,
        description: body.weather[0].description,
        cityName: body.name,
      });
    }
  });
};

module.exports = weatherData;
