const axios = require("axios");


class Forecast{
    constructor (date, description){
    this.date = date;
    this.description = description;
    };
};

function createForecast(weatherData){
    const weatherReadings = weatherData.data.map((day) => {
    const date = day.datetime;
    const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    return new Forecast(date, description)
    });
return weatherReadings;
};

async function grabWeather(request, response){
    // let city = request.query.searchquery;
    const lat = request.query.lat;
    const lon = request.query.lon;
    const weatherAPI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.Weather_API_KEY}`;
    const weatherData = await axios.get(weatherAPI);
    response.status(200).send(createForecast(weatherData.data));
}


module.export = {grabWeather};