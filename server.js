'use strict'

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9001;
const axios = require("axios");
const cors = require("cors");
const movie=require("./components/movie.js");
const weather=require("./components/weather.js");

app.use(cors());
app.get('/weather', weather.grabWeather);
app.get('/movie', movie.grabMovie);

// app.get('/', (request, response) => {
//     response.status(200).send('It\'s over 9000!')
// });

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
