// ____________________________________________________________________________________
// LOAD DATA
// Array of Existing friend Finder objects
// ____________________________________________________________________________________

var friendData = require("../data/friends");

// ____________________________________________________________________________________
// ROUTES
// ____________________________________________________________________________________

module.exports = function(app) {
// "API GET" requests JSON content of the data in the Friend array. 
// 
// ____________________________________________________________________________________

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

// "API POST" requests data submitted by user, then push data to the proper array as a JSON Object.
// Data is saved in Friend Array
// ---------------------------------------------------------------------------

  app.post("/api/friends", function(req) {
    // adds the information from the survey to the friend Array
    // req.body is available since we're using the body-parser middleware
      friendData.push(req.body);
  });

  // ---------------------------------------------------------------------------

  app.post("/api/clear", function() {
    // Cleans up all data in arrays;
    friendData = [];

    console.log(friendData);
  });
};
