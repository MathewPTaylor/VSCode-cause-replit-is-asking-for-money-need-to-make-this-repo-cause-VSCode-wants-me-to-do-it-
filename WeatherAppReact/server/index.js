const express = require("express");
const cors = require("cors");
const axios = require("axios");
// import NODE_WEATHER_API_KEY from ".env"

// console.log(NODE_WEATHER_API_KEY);

const app = express();

const corsOptions = {
    origin: '*', // Replace with your frontend's full URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));



// APP PATHS
app.get("/api", (req, res) => {
    console.log("REQUEST", req);
    res.json({message: "yo son im responding."});
});


app.post("/api/get_weather", (req, res) => {
    let body = req.data;
    // console.log(req);
    console.log("BODY", req.body);
    res.json(body);
});

app.listen(5000, () => {
    console.log("listening bitch");
}); 