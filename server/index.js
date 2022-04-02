const express = require("express");
const cors = require("cors");

// use env var inside express server
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// initialise express
const app = express();
//enable cors
app.use(cors());

// create routes
// using async as we have to wait for api call to get response
app.use("/api/search", require("./routes/search.js"));

// -----
app.use("/api/weather", require("./routes/weather.js"));
// ---
//app.use("/api/search", async (req, res) => {
   // try {
   //    //add query strings
   //    const params = new URLSearchParams({
   //       access_token: process.env.API_KEY,
   //       ...url.parse(req.url, true).query
   //    });
   //    console.log(params);
   //    const query = req.params.query;
   //    const results = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`);
   //    //const results = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.API_KEY}`);
   //    const data = results.data;
   //    res.status(200).json(data);
   // }
   // catch(err) {
   //    res.status(500).json({ error: err.message})
   // }
//});


app.listen(PORT, () => {console.log(`Started on port ${PORT}`)})