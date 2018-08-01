// Dependencies
// ===========================================================
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// ===========================================================



// Routes
// ===========================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "public/survey.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});



app.get('/api/tables', function(req, res) {
    res.json(reservations)
})

app.get('/api/waitlist', function(req, res) {
    res.json(waitlist)
})


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });