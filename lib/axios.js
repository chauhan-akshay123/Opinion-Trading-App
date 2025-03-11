const axios = require("axios");
require("dotenv").config();

const apiClient = axios.create({
   baseURL: 'https://v3.football.api-sports.io',
   headers: {
    'x-rapidapi-key': process.env.API_SPORTS_FOOTBALL_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
   }  
});

module.exports = apiClient;
