'use strict'
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 9002;
const axios = require("axios");
const cors = require("cors");
const weather = require ("./weather.js");
const movie = require ("./movie.js");

app.use(cors());


app.get('/', (request, response) => {
    response.status(200).send('It\'s over 9000!')
});

app.get('/weather', weather.grabWeather);

app.get('/movie', movie.grabMovie);


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
