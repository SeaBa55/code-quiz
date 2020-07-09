// init object array for questions, multiple choice options, and corresponding answers
var questions = [
    
    {question: "Commonly used data types DO NOT include:", 
    options: ["strings", "booleans", "alerts", "numbers"], 
    answer: "alerts"},

    {question: "The condition in an 'if/else' statement is enclosed within ______.", 
    options: ["quotes", "curly brackets", "parentheses", "square brackets"], 
    answer: "parentheses"},

    {question: "Arrays in Javascript can be used to store ______.", 
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"},

    {question: "String values must be enclosed within ______ when being assigned to variables.", 
    options: ["commas", "curly brackets", "quotes", "parantheses"], 
    answer: "quotes"},

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
    options: ["Javascript", "terminal/bash", "for loops", "console.log"], 
    answer: "terminal/bash"}
];

// init array for user answer
var userAnswers = ["","","","",""];

// init global var for user correct answer count
var userCorrect = 0;

// init global var for user user score
var userScore = "";

// init global variable for question index - used by the questionState function
var questionIndex = 0;

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
$(submitButton).on('click', results)


// function defining what is to happen upon quiz start (after start button click event)
function startQuiz(){

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

                // increment the user's correct answers count - to be used for user score calculation upon submit button on-click event
                userCorrect++;

            }else{

                // else, if the answer is incorrect, then show the button with class "btn-danger" for red styling
                $('#'+e.target.id).addClass('btn-danger'); 

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

        // if on first question hide the previous button - will likely have to move this to the prev button function once I create it.
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

    // create new div elements for results "page" content
    let resultDiv = $("<div>");
    let lineDiv = $("<div>"); 
    let brk = $("<br/>");
    let scoreHist = $("<div>");
    let formSave = $("<div>");
    let formLable = $("<label>");
    let formInput = $("<input>");
    let formSmall = $("<small>");
    let formBtns = $("<div>");
    let formSaveBtn = $("<button>")

    // add classes to style the new div elements for results "page" content
    $(resultDiv).addClass('card-title');
    $(lineDiv).addClass('line');
    $(scoreHist).addClass('scores-container');
    $(formSave).addClass('form-group');

    // add classes to style the new div elements for results "page" content
    $(resultDiv).text("Your Score: " + userScore + "%");
    $(scoreHist).text("Your Score History:");

    // append new content to the card-body container
    $("#quiz-container").append(resultDiv,lineDiv,brk,scoreHist,formSave);

    // add classes to style the new from elements for results "page" content
    $(formInput).addClass('form-control');
    $(formSmall).addClass('form-text text-muted');
    $(formBtns).addClass('form-grp-btns');


    $(formSave).attr("id", "form-save-score");
    $(formInput).attr("placeholder", "Your Initials");
    $(formBtns).attr("id", "form-save-btn");
    $(formLable).text("Enter Initials");
    $(formSmall).text("Click Save to register your score");

    
    $("#form-save-score").append(formLable,formInput,formSmall,formBtns);


    $(formSaveBtn).addClass('save-btn btn btn-outline-dark');

    $(formSaveBtn).attr("type", "submit");
    $(formSaveBtn).text("Save")


    $("#form-save-btn").append(formSaveBtn);

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