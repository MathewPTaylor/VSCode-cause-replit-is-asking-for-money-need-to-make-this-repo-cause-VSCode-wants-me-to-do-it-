const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.NODE_WEATHER_API_KEY;
const app = express();

console.log(API_KEY);

const corsOptions = {
    origin: '*', // Replace with your frontend's full URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));
app.use(express.json());


// APP PATHS
app.get("/api", (req, res) => {
    console.log("REQUEST", req);
    res.json({message: "yo son im responding."});
});

function cherryPickWeather(weatherData) {
    let returnObj = {
        error: weatherData.error? weatherData.error : null,
        name: weatherData.location.name,
        country: weatherData.location.country,
        time: weatherData.location.localtime,
        lastTime: weatherData.current.last_updated,
        metData: {
            tempC: weatherData.current.temp_c,
            tempF: weatherData.current.temp_f,
            wind: weatherData.current.wind_kph,
            windDir: weatherData.current.wind_degree,
            precipMm: weatherData.current.precip_mm,
            humidity: weatherData.current.humidity,
            condition: {
                text: weatherData.current.condition.text,
                icon: weatherData.current.condition.icon
            }
        },
        aqiData: {
            pm2_5: weatherData.current.air_quality.pm2_5,
            USEpaIndex: weatherData.current.air_quality["us-epa-index"]
        }

    }
    return returnObj
}

app.post("/api/get_weather", (req, res) => {
    try {
        const data = req.body;
        var weatherData = {};
        console.log("location", data);

        axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${data.location}&aqi=yes`)
        .then(response => {
            weatherData = response.data;
            console.log("DATATAAAAA", weatherData);
        
            const returnData = cherryPickWeather(weatherData);
            console.log("RETURN DATA", returnData);

            res.status(200).send({message: "RECEIVED", data: returnData});
        }).catch(e => {
            console.log(e);
            res.status(400).send({error: e.data});
        });
    } catch (e) {
        console.log(e);
    }
});

app.listen(3001, () => {
    console.log("listening bitch");
}); 