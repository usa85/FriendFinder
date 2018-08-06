
// LOAD DATA

var friendData = require("../data/friends");

// ROUTES

module.exports = function(app) {
// "API GET" requests JSON content of the data in the Friend array. 


  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

// "API POST" requests data submitted by user, then push data to the proper array as a JSON Object.

  app.post("/api/friends", function(req) {
      friendData.push(req.body);
  });

  app.post("/api/clear", function() {
    
    friendData = [];

    console.log(friendData);
  });
};
