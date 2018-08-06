// Survey Questions
// ____________________________________________________________________________________

var surveyQuestions = [

    "I like travelling.",
    "I like cooking.",
    "I like drinking alcohol.",
    "I like smoking.",
    "I am a vegetarien.",
    "I have pets.",
    "I like classical music.",
    "I like nature.",
    "I enjoy reading",
    "I am the center of a party.",
    "I am very reserved.",
    "I care about others."
  ]
  
  // Main Function
  // ____________________________________________________________________________________
  
  // Display the survey questions
  
  displaySurvey();
  
  // When form submit button pressed
  
  $(".submit").on("click", (event) => {
      event.preventDefault();
  
      // Get input from survey
      let newFriend = getsurveyAnswers()
  
      // Add new friend to friend data array
      $.post("/api/friends", newFriend);
  
      // Get all possible friends from list
      $.get("/api/friends", (data) => {
          findFriend(newFriend,data);
      })
  });
  
  
  // ____________________________________________________________________________________
  // Functions
  // ____________________________________________________________________________________
  
  function displaySurvey () {
  
     // Display Survey
  
     for (var i = 0; i < surveyQuestions.length; i++) {
         $("#survey").append(
         `<h4 class="font-weight-bold">Question ${i+1}</h4>`
         +   `<h6>${surveyQuestions[i]}</h6>`
         +   `<select id = "q${i}" class="custom-select custom-select-sm" style="width: 15%">`
         +   `<option selected value="3">Select an Option</option>`
         +   `<option value="1">1 (Strongly Disagree</option>`
         +   `<option value="2">2</option>`
         +   `<option value="3">3</option>`
         +   `<option value="4">4</option>`
         +   `<option value="5">5 (Strongly Agree)</option>`
         +   `</select><br><br>`
         );
     }
  }
  
  // ____________________________________________________________________________________
  
  function getsurveyAnswers(){
  
      let scores = [];
      // Get the responses from each of the survey questions
      for ( var i=0; i<surveyQuestions.length; i++){
          scores[i] = $(`#q${i}`).val();
      }
  
      // Assign to friend object
      let friend = {
      friendName: $("#friendName").val().trim(),
      photo: $("#photo").val().trim(),
      scores: scores
      };
  
      // Reset the form
      $("form")[0].reset();
      return friend;
  }
  // ____________________________________________________________________________________
  
  function findFriend(friend,friendData){
      let ifriend = 0;
      let friendScore = 4 * friendData.length; // maximum score for two people
      let m = [] // temporary array to hold friend score calcuation
  
      // Calculate friend score with each possible friend in the array
      for (j=0; j<friendData.length-1; j++){
          // Calculate the difference between each survey response, loop through each possible friend
          m = friend.scores.map( (v, i)  =>{ return Math.abs(v - friendData[j].scores[i]); });
  
          // Add all difference values to create a friend score
          var sum = m.reduce((m, b) => { return m + b; }, 0);
          
          // The lower the friend score, the more compatible the two people are, keep the lower score
          if ( sum < friendScore) {
              friendScore = sum;
              ifriend= j;
          }
    
  
          $(".modal-title").text(`Here is a possible friend:`);
          $(".modal-body").html(`<h4>${friendData[ifriend].friendName}</h4><img src="${friendData[ifriend].photo}" alt="New Friend">`);
      }
  }
  
  // ____________________________________________________________________________________
  