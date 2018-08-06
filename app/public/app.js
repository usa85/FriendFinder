// Question for Survey
// 
// App is a list of questions that are displayed into the survey.html page.
// App has two groups of questions.  1) personal asking for name and photo. 2) an evaluation of personality. 
// App gathers a list of answers for each question.  Answers are a score.
// App compares the user list of scores with the friendArray score.
// App relies on JavaScript, JQuerry, Ajax, Loops, Array, Form, and Modal.
// 
// SurveyQuestions are randomly selected and bogus.  
// User SurveyQuestions scores are compared to a random list of friends in friends.js.   
// List of friends is bogus.
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
  
  
  
  // Displays the survey questions
  
  displaySurvey();

  
  // When form submit button is pressed, upgrades array.
  
  $(".submit").on("click", (event) => {
      event.preventDefault();
  
      // Gets input 
      let newFriend = getsurveyAnswers()
  
      // Adds new friend
      $.post("/api/friends", newFriend);
  
      // Gets proposed friends 
      $.get("/api/friends", (data) => {
          findFriend(newFriend,data);
      })
  });
  
  
  
  
  function displaySurvey () {
  
     // Display Survey
  
     for (var i = 0; i < surveyQuestions.length; i++) {
         $("#survey").append(
         `<h4 class="font-weight-bold">Question ${i+1}</h4>`
         +   `<h6>${surveyQuestions[i]}</h6>`
         +   `<select id = "q${i}" class="custom-select custom-select-sm" style="width: 15%">`
         +   `<option selected value="3">Select an Option</option>`
         +   `<option value="1">1 (Disagree)</option>`
         +   `<option value="2">2</option>`
         +   `<option value="3">3</option>`
         +   `<option value="4">4</option>`
         +   `<option value="5">5 (Agree)</option>`
         +   `</select><br><br>`
         );
     }
  }
  
  
  
  function getsurveyAnswers(){
  
      let scores = [];
      // Gets the responses from survey questions
      for ( var i=0; i<surveyQuestions.length; i++){
          scores[i] = $(`#q${i}`).val();
      }
  
      // Assigns to friend array
      let friend = {
      friendName: $("#friendName").val().trim(),
      photo: $("#photo").val().trim(),
      scores: scores
      };
  
      // Clears and Resets form
      $("form")[0].reset();
      return friend;
  }
  

  
  function findFriend(friend,friendData){
      let ifriend = 0;  // counter for first loop
      let friendScore = 4 * friendData.length; // score for two people
      let scoreEstimate = [] // Local array to hold score estimate
  
      // Calculates friend score with each potential friend in the array, then calculates the difference between each response, looping through friend array
      for (j=0; j<friendData.length-1; j++){
          
          scoreEstimate = friend.scores.map( (v, i)  =>{ return Math.abs(v - friendData[j].scores[i]); });
  
          
          var sum = scoreEstimate.reduce((scoreEstimate, b) => { return scoreEstimate + b; }, 0);
          
          //select friends.
          if ( sum < friendScore) {
              friendScore = sum;
              ifriend= j;
          }
    
  
          $(".modal-title").text(`Here is a possible friend:`);
          $(".modal-body").html(`<h4>${friendData[ifriend].friendName}</h4><img src="${friendData[ifriend].photo}" alt="New Friend">`);
      }
  }
  
  // ____________________________________________________________________________________
  