// Dependencies
// ===========================================================
const express = require("express");
const bodyParser = require('body-parser')

// Express Set Up
const app = express();
const PORT = process.env.PORT || 8080;

// Express setup parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('app/public'))


// These routes tell the server how to respond when users visit or request data from various URLs.

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });