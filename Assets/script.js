// init object array for questions, multiple choice options, and corresponding answers
var questions = [
    
    {question: "Commonly used data types DO NOT include:", 
    options: ["strings", "booleans", "alerts", "numbers"], 
    answer: "alerts"},

    {question: "The condition in an 'if/else' statement is enclosed within ______.", 
    options: ["quotes", "curly brackets", "parentheses", "square brackets"], 
    answer: "parentheses"},

    {question: "Arrays in Javascript can be used to store ______.", 
    options: ["numbers & strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"},

    {question: "String values must be enclosed within ______ when being assigned to variables.", 
    options: ["commas", "curly brackets", "quotes", "parantheses"], 
    answer: "quotes"},

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
    options: ["Javascript", "terminal/bash", "for loops", "console.log"], 
    answer: "terminal/bash"}
];

// init array for user answers
var userAnswers = ["","","","",""];

// init global var for user correct answer count
var userCorrect = 0;

// init global var for user user score
var userScore = "";

// init global variable for question index - used by the questionState function
var questionIndex = 0;

// init global variable used to start timer
var starTimer = 0;

// init global variable for alloted time of 2 minutes - will be used to manipulate the timer based on wrong answer selections
var secondsLeft = 120;

// init global variable for question prompt text
var questionPrompt = $('#question-prompt');

// init global variable for answer buttons container element 
var ansContainEl = $('#answer-buttons');

// init global start-button variable
var startButton = $('#start-btn');

// init global previous-button variable
var prevButton = $('#prev-btn');

// init global next-button variable
var nextButton = $('#next-btn');

// init global next-button variable
var submitButton = $('#submit-btn');

// multiple choise option buttons event listener on parent div element answer-buttons 
$(ansContainEl).on('click',selectAns)

// start button event listener
$(startButton).on('click',startQuiz)

// next button event listener
$(nextButton).on('click',nextQuest)

// prev button event listener
$(prevButton).on('click',prevQuest)

// submit button event listener
$(submitButton).on('click',results)


// function defining what is to happen upon quiz start (after start button click event)
function startQuiz(){

    // start timer
    starTimer = 1;

    // randomize ("suffle") question order. only needs to occur once.
    randQuestions = shuffle(questions);

    // adding hide class to the start button inorder to remove it from viewport
    $(startButton).addClass('hide');

    // replacing quiz instruction text with first question prompt
    $(questionPrompt).text(randQuestions[questionIndex].question);

    // adding answer options programattically using the first element in question.options object array
    questions[questionIndex].options.forEach(ans => {

        // init button varible and create a new button element for each loop itteration
        let button = $("<button>")

        // create a 3 character unique id to assign to each multiple choise option button. uses first 3 characters of text associated with each button.  
        let buttonId = uniqueId(ans);

        // format button appearance using bootstrap classes 
        $(button).addClass('btn btn-outline-dark btn-block chosen');

        // give each button a unique id using the answer it represents
        $(button).attr("id", buttonId);

        // add multiple chois answer text to button
        $(button).text(ans);

        // append button to answer-button div area
        $("#answer-buttons").append(button);
    })

    // removing hide class to the answer buttons container element, to show first quiz question answers in viewport
    $(ansContainEl).removeClass('hide');

    // removing hide class to the next button element, to show next button in viewport
    $(nextButton).removeClass('hide');

}


// fucntion that handles multiple choice click events through parent div element answer-buttons 
function selectAns(e){

    // only let user make multiple choise selections for unanswered questions
    if(userAnswers[questionIndex] === "") {

        // optimization that ensures user is not registering a click on the parent element itself 
        if(e.target !== e.currentTarget) {

            // store answer in userAnswer array by replacing default value with the text content of the selected multiple choise option
            userAnswers.splice(questionIndex, 1, e.target.textContent);

            // create a 3 character unique id to compare correct answer to the user-selected multiple choise answer. uses first 3 characters of text associated with the correct answer.
            let ansId = uniqueId(questions[questionIndex].answer);

            // compare the target button id with the correct answer 3 character unique id
            if(e.target.id == ansId) {

                // if the answer is correct, then show the button with class "btn-success" for green styling
                $('#'+e.target.id).addClass('btn-success');
                $('#'+e.target.id).removeClass('btn-outline-dark');

                // increment the user's correct answers count - to be used for user score calculation upon submit button on-click event
                userCorrect++;

            }else{

                // else, if the answer is incorrect, then show the button with class "btn-danger" for red styling
                $('#'+e.target.id).addClass('btn-danger'); 
                $('#'+e.target.id).removeClass('btn-outline-dark');

                // subtract 30 seconds off the clock
                secondsLeft -= 30;

            }

        }

        // kill event propagation at the "answer-button" div element (multiple choise buttons parent) level
        e.stopPropagation();

    }

}


// function defining what is to happen upon clicking the next button element
function nextQuest(){

    // call resetQuestions to remove previous multiple choise answer options
    resetQuestions()

    // next button - qi = 1 for increment; prev button - qi = -1 for decrement of questionIndex
    let qi = 1;

    // call questionState to increment the question state index. keeps track of what question user is on.
    questionState(qi)

    // replacing quiz instruction text with first question prompt
    $(questionPrompt).text(randQuestions[questionIndex].question);

    // adding answer options programattically using the first element in question.options object array
    questions[questionIndex].options.forEach(ans => {

        // init button varible and create a new button element for each loop itteration
        let button = $("<button>")

        // create a 3 character unique id to assign to each multiple choise option button. uses first 3 characters of text associated with each button.  
        let buttonId = uniqueId(ans);

        // format button appearance using bootstrap classes 
        $(button).addClass('btn btn-outline-dark btn-block chosen');

        // give each button a unique id using the answer it represents
        $(button).attr("id", buttonId);

        // add multiple choise answer text to button
        // js - button.innerHTML = answer;
        $(button).text(ans);

        // append button to answer-button div area
        $("#answer-buttons").append(button);
    })

    // call function prevAnsStyle to check if question has already been aswered, and show user selections of previously answered items
    prevAnsStyle()

    // removing hide class to the prev button element, to show prev button in viewport after the first question
   if(questionIndex == 1) {

        // if on second question show the previous button - will remain active untill submit button is pressed (need to create a submit button)
        $(prevButton).removeClass('hide');

    }

    // adding hide class to the next button element, to remove next button in viewport in the final question (consider using == 4 instead of > 3 since we are dealing with ints)
    if(questionIndex > 3) {

        // adding hide class to the next button element, to remove next button in viewport
        $(nextButton).addClass('hide');

        // removing hide class to the submit button element, to add submit button in viewport
        $(submitButton).removeClass('hide');
    }

}


// function defining what is to happen upon clicking the prev button element
function prevQuest(){

    // call resetQuestions to remove previous multiple choise answer options
    resetQuestions()

    // next button - qi = 1 for increment; prev button - qi = -1 for decrement of questionIndex
    let qi = -1;

    // call questionState to increment the question state index. keeps track of what question user is on.
    questionState(qi)

    // replacing quiz instruction text with first question prompt
    $(questionPrompt).text(randQuestions[questionIndex].question);

    // adding answer options programattically using the first element in question.options object array
    questions[questionIndex].options.forEach(ans => {

        // init button varible and create a new button element for each loop itteration
        let button = $("<button>")

        // create a 3 character unique id to assign to each multiple choise option button. uses first 3 characters of text associated with each button.  
        let buttonId = uniqueId(ans);

        // format button appearance using bootstrap classes 
        $(button).addClass('btn btn-outline-dark btn-block chosen');

        // give each button a unique id using the answer it represents
        $(button).attr("id", buttonId);

        // add multiple choise answer text to button
        $(button).text(ans);

        // append button to answer-button div area
        $("#answer-buttons").append(button);
    })

    // call function prevAnsStyle to check if question has already been aswered, and show user selections of previously answered items
    prevAnsStyle()

    // removing hide class to the prev button element, to show prev button in viewport
    if(questionIndex == 0) {

        // if on first question hide the previous button
        $(prevButton).addClass('hide');

    }

    // remove hide class to the next button element, to add next button back in viewport if prev button is clicked in the final question (consider using == 3 instead of < 4 since we are dealing with ints)
    if(questionIndex < 4) {

        // removing hide class to the next button element, to show next button in viewport
        $(nextButton).removeClass('hide');

        // adding hide class to the submit button element, to remove submit button in viewport
        $(submitButton).addClass('hide');

    }

}


// function that determines the style of previous user selecton multiple choise buttons
function prevAnsStyle() {

    // if userAnswers is not empty at any given question index then proceed to restyle the buttons
    if(userAnswers[questionIndex] != "") {

        // give unique id to previous answer selection
        let prevAnsId = uniqueId(userAnswers[questionIndex])
            
        // give unique id to correct answer
        let ansId = uniqueId(questions[questionIndex].answer);

        // compare user answer with correct answer to determine previously answered question styling
        if(prevAnsId == ansId) {

            // if the answer was correct, then show previous button selection with class "btn-success" for green styling
            $('#'+prevAnsId).addClass('btn-success');

        }else{

            // else, if the answer was incorrect, then show previous button selection with class "btn-danger" for red styling
            $('#'+prevAnsId).addClass('btn-danger'); 

        }
    }
}

// results fucntion calculates user socre and creates new div elements to display result info in viewport. executes upon submit button click.
function results() {

    // calculate user score as a percent to one decemal place 
    userScore = ((userCorrect/userAnswers.length) * 100).toFixed(1);

    // reset the quiz-container div element to make space to write results
    resetQuestions()

    // Init vars for results section
    var resultDiv = $("<div>");
    var lineDiv = $("<div>"); 
    var brk = $("<br/>");
    var scoreHist = $("<ul>");
    var formSave = $("<div>");
    var formLable = $("<label>");
    var formInput = $("<input>");
    var formSmall = $("<small>");
    var formBtns = $("<div>");
    var formSaveBtn = $("<button>");
    var formRetryBtn =  $("<button>");
    var formClearBtn =  $("<button>");

    // add classes to style the div elements for results section
    $(resultDiv).addClass('card-title');
    $(lineDiv).addClass('line');
    $(scoreHist).addClass('list-group list-group-flush hide');
    $(formSave).addClass('form-group');

    $(scoreHist).attr("id", "score-hist");

    // add text to the card title to report user's current score
    $(resultDiv).text("Your Score: " + userScore + "%");
    $(scoreHist).text("Score History:");

    // append new content to the card-body container
    $("#quiz-container").append(resultDiv,lineDiv,brk,scoreHist,formSave,formBtns);

    // add classes to style the results section from elements
    $(formInput).addClass('form-control');
    $(formSmall).addClass('form-text text-muted');
    //
    $(formBtns).addClass('form-grp-btns');

    // add attributes and text to the from countrols 
    $(formSave).attr("id", "form-save-score");
    $(formInput).attr("placeholder", "Your Initials");
    $(formBtns).attr("id", "form-control-btn");
    $(formInput).attr("id", "form-input-init");
    $(formLable).text("Enter Initials");
    $(formSmall).text("Click Save to register score");

    // append form controls to the form group div in the card-body container
    $("#form-save-score").append(formLable,formInput,formSmall);

    // add bootstrap classes to the form button controls
    $(formSaveBtn).addClass('btn btn-outline-dark');
    $(formRetryBtn).addClass('btn btn-outline-dark');
    $(formClearBtn).addClass('btn btn-outline-danger hide');
    
    // add type attributes for acces
    $(formSaveBtn).attr("type", "submit");
    $(formRetryBtn).attr("type", "button");
    $(formClearBtn).attr("type", "button");

    // add form button controls id's
    $(formSaveBtn).attr("id", "save-btn");
    $(formRetryBtn).attr("id", "retry-btn");
    $(formClearBtn).attr("id", "clear-btn");

    // add form button controls names in viewport
    $(formSaveBtn).text("Save");
    $(formRetryBtn).text("Retry");
    $(formClearBtn).text("Clear");

    // append save button to the button div container
    $("#form-control-btn").append(formSaveBtn,formRetryBtn,formClearBtn);

    // form button controls event listener on parent div element form-save-btn
    $("#form-control-btn").on('click',formControlHandler);

}

// form button controls event handler function
function formControlHandler(e){
    
    // optimization that ensures user is not registering a click on the parent element itself 
    if(e.target !== e.currentTarget) {

        // check if target button id coresponds with save button
        if(e.target.id == "save-btn") {

            // hide save button
            $('#'+e.target.id).addClass('hide');
            
            // show the clear button
            $('#clear-btn').removeClass('hide');

            // hide #form-save-score div element
            $('#form-save-score').addClass('hide');

            // ------------------------------------------------------------------------
            // save user data to browser storage, and append to #score-hist (localStorage)
            // ------------------------------------------------------------------------

            // initialize results array
            var results = [];

            // initialize prevResults array
            var prevResults = [];

            // initialize user result array
            var userResult = [];

            // initialize user input form (initals) var
            var userIn = $('#form-input-init').val();

            // push user quiz result data to userScore array 
            userResult.push(userScore);
            userResult.push(secondsLeft);

            // results array encapsulates the userResult array items for a nested array structure (I found this easier that dealing with objects inside the results array for this application)
            results.push(userResult);

                // check if localStorage has been populated with new user results data
            if (localStorage.getItem(userIn) == null){
                
                // if not, populate it with new user result
                localStorage.setItem(userIn,JSON.stringify(results));

            }else{                

                // loop that checks if the current result user is duplicate
                for( var i = 0; i < localStorage.length; i++) {

                    // check if the currently indexed key is equivalent to the value of the input form (the provided user initials). If so, there is already an existing result element for this user.
                    if(localStorage.key(i) == userIn) { 

                        // get indexed localStorage item for previous user results, and parse it back to prevResults array
                        prevResults = JSON.parse(localStorage.getItem(userIn));

                        // push new result instance into prevResults array
                        prevResults.push(results[0]);
                        
                        // save the concatinated resultant array back to results for storage
                        results = prevResults;

                        // add user results data back to localStorage  
                        localStorage.setItem(userIn,JSON.stringify(results));

                    }

                }

            }

            // show score history
            $('#score-hist').removeClass('hide');

            // loop through localStorage to extract user results to append to viewport score history display area
            for( var i = 0; i < localStorage.length; i++) {
                
                // add first item in localStorage to prevResults array
                prevResults = JSON.parse(localStorage.getItem(localStorage.key(i)));

                // loop through prevResults array to display previous user results for a single user 
                for( var j = 0; j < prevResults.length; j++) {

                    // result display string format - could use more attention to styling in the future
                    resultText = localStorage.key(i) + " -    Score: " + prevResults[j][0] + " -    Time elapsed: " + (120 - prevResults[j][1]) + " sec";
                    
                    // Create a <li> list item "node"
                    var node = $("<li>");

                    // add bootstrap class to style the list item
                    $(node).addClass('list-group-item');

                    // add id attribute to the list item 
                    $(node).attr("id", "list-item");
                    
                    // Create a text node                 
                    $(node).text(resultText);  
                    
                    // Append <li> elements to <ul> element of id = "score-hist"
                    $('#score-hist').append(node);

                } 
                   
            }

        // check if event target id corresponds to the retry button
        }else if(e.target.id == "retry-btn"){

            // reload page to start over and attempt to surpass previous scores
            location.reload();

        }else if(e.target.id == "clear-btn"){

            // clear score history by clearing localStorage   
            localStorage.clear();

            // remove clear button
            $('#clear-btn').addClass('hide');

            // change the score history text to inform user that localStorage has been cleared  
            $("#score-hist").text("Score History: Cleared!"); 

        }

    }

    // kill event propagation at the "form-control-btn" div element (form button controls event listener on parent) level
    e.stopPropagation();    
}


// function to keep track of what question user is on with questionIndex. pass qi = 1 for increment, and qi = -1 for decrement.
function questionState(qi) {

    if(qi > 0){
        questionIndex++
    }else if(qi < 0){
        questionIndex--;
    }
        
}


// function to remove previous multiple choise answer options
function resetQuestions() {
    
    // if user score has not yet been calculated only perform reset on answer-buttons div element; else, clear the quiz-container div element for results
    if(userScore == "") {

        // remove all child nodes in the answer-buttons div element
        $("#answer-buttons").empty();

    }else {

        // stop timer
        starTimer = 0;
        // remove all child nodes in the quiz-container div element
        $("#quiz-container").empty();

    }
}


// Fisher–Yates Shuffle - source https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

// Function to create a unique multiple choise options button id selector using the first three char of the option text  
function uniqueId(str) {

    let uid = '';

    for(var i = 0; i < 3; i++) {

        // concatinate i'th character of str to uid
        uid += str.charAt(i)

    }

    // pass uid back to original function call
    return uid;
}

// Timekeeping function 
function setTime() {

  var timerInterval = setInterval(function() {

    // don't start the  timer untill starTime = 1. start button triggers the timer, and submit button stops it
    if (starTimer > 0){
        
        // decrement the timer every 1000ms
        secondsLeft--;
    
    }

    // write the value of seconds left in the Timer window in viewport
    document.getElementById("display").value = "" + secondsLeft + " sec";

    // if the timer runs out of time stop the timer and go results
    if(secondsLeft <= 0) {

        // if the timer goes negative due to low time and too many wrong answers, print "u suc" in the timer display - poke fun at the user so they play again!
        if(secondsLeft < 0) {

            document.getElementById("display").value = " u suc"
        
        }

        clearInterval(timerInterval);
        results();

    }
    
    // 1000ms wait
  }, 1000);

}

// continuous timer function call
setTime();