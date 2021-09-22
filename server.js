'use strict'
require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json');

const PORT = process.env.PORT || 9002;
const app = express();


app.get('/', (request, response) => {
    response.status(200).send('turn back!')
});

app.get('/weatherData', (request, response) => {
try{
let city = request.query.searchquery;
const lat =request.query.lat;
const lon = request.query.lon;

if(city){
    city=city.toLowerCase();
};



const weatherQuery = weatherData.find( searchedCity => searchedCity.city_Name.toLowerCase() === city && searchedCity.lat === lat && searchedCity.lon === lon);


if(weatherQuery === true){
    createWeather(city)
};



createWeather(city);
}
catch (error){
response.send(404, `Error Not A City`)
};


response.send(weatherQuery)
});

class Forecast{
    constructor (date, description){
    this.date = date;
    this.description = description;
    };

}
function createWeather(city){
    const weatherReadings = city.weatherData.map((day) => {
        const date = day.datetime;
        const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
        return new Forecast(date, description)
    });
    return weatherReadings;
}
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));