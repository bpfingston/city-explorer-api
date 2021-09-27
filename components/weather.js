'use strict'
const axios = require("axios");
const { response } = require("express");
const cache = require("./cache.js")

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
}

  async function grabWeather (request, response) {
    var latitude = request.query.lat;
    var longitude = request.query.lon;
    const citySearch = 'weather-' + latitude + longitude;
    const weatherAPI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.Weather_API_KEY}`;
    console.log(weatherAPI)
  
    if(cache.cache.weather[citySearch] && (Date.now() - cache.cache.weather[citySearch].time < 8640000)){
        response.send(cache.cache.weather[citySearch]);
    
    } else {
        const grabNewWeather = await axios.get(weatherAPI).then(response => createForecast(response.data))
        let cachedWeather = {
            data: grabNewWeather,
            time: Date.now()
        }
        cache.cache.weather[citySearch] = cachedWeather;
        response.status(200).send(cachedWeather);
    };
};


module.exports={grabWeather};
