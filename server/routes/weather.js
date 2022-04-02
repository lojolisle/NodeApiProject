const express = require("express");
const router = express.Router();
const axios = require("axios");

//url module is available within express
const url = require("url");

router.get("/:query", async (req, res) => {
   try {
      //add query strings
      const params = new URLSearchParams({
         access_token: process.env.WEATHER_API_KEY,
         ...url.parse(req.url, true).query
      });
      console.log('----weather---')
      console.log(req.params.query);
      const query = req.params.query;
      console.log(query)
      const results = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${query}.json?${params}`);

      const data = results.data;
      res.status(200).json(data);
   }
   catch(err) {
      res.status(500).json({ error: err.message})
   }
});

module.exports = router;