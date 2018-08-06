// htmlRoutes handle the possible action requested by user.  That is, 
// the route can be home.html
// the route can be the survey.html
// if the user enters any other options or misspells an option, the route reloads the index or home.html page.

var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
