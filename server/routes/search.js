const express = require("express");
const router = express.Router();
const axios = require("axios");

//url module is available within express
const url = require("url");

router.get("/:query", async (req, res) => {
   try {
      //add query strings
      const params = new URLSearchParams({
         access_token: process.env.API_KEY,
         ...url.parse(req.url, true).query
      });
      console.log(params);
      const query = req.params.query;
      console.log(query)
      const results = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`);

      // // Get this data of city and state to be displayed on map after selction
      results.data.features.forEach((item) => {
         // init set to null
         item.city = null;
         item.state = null;

         item.context.forEach((type) => {
            if (type.id.includes("place")) {
               item.city = item.text;
            }
            if (type.id.includes("region")) {
               item.state = item.text;
            }
         });
      });

      const data = results.data;
      res.status(200).json(data);
   }
   catch(err) {
      res.status(500).json({ error: err.message})
   }
});

module.exports = router;