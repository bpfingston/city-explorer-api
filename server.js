'use strict'
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 9002;
const weatherData = require("./data/weather.json");
const cors = require("cors");
// const { response } = require("express");
app.use(cors());


app.get('/', (request, response) => {
    response.status(200).send('It\'s over 9000!')
});


class Forecast{
    constructor (date, description){
    this.date = date;
    this.description = description;
    };
}

app.get('/weather', (request, response) => {
    let city = request.query.searchquery;
    const lat = request.query.lat;
    const lon = request.query.lon;


    try{
        city=city.toLowerCase();
        
    const cityData = weatherData.find( 
        (searchedCity) => 
            searchedCity.city_name.toLowerCase() === city &&
            searchedCity.lat === lat && 
            searchedCity.lon === lon
    );
    console.log(createWeather(cityData), '<--- my stuff');
    response.send(createWeather(cityData));
    }catch(error){
    response.status(404, `Error Not A City`);
    };

    function createWeather(cityData){
        const weatherReadings = cityData.data.map((day) => {
        const date = day.datetime;
        const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
        return new Forecast(date, description)
        });
    return weatherReadings;
    };
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
