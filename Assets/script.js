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


// init global variable for question index - used by the questionState function
var questionIndex = 0;

// init global variable for question prompt text
// js - var questionPrompt = document.getElementById('question-prompt');
var questionPrompt = $('#question-prompt');

// init global variable for answer buttons container element 
// js - var ansContainEl = document.getElementById('answer-buttons');
var ansContainEl = $('#answer-buttons');

// init global start-button variable
// js - var startButton = document.getElementById('start-btn');
var startButton = $('#start-btn');

// init global previous-button variable
// js - var prevButton = document.getElementById('prev-btn');
var prevButton = $('#prev-btn');

// init global next-button variable
// js - var nextButton = document.getElementById('next-btn');
var nextButton = $('#next-btn');

// init global next-button variable
// js - var submitButton = document.getElementById('submit-btn');
var submitButton = $('#submit-btn');

// multiple choise option buttons event listener on parent div element answer-buttons 
// js - ansContainEl.addEventListener('click',electAns);
$(ansContainEl).on('click',selectAns)

// start button event listener
// js - startButton.addEventListener('click',startQuiz);
$(startButton).on('click',startQuiz)

// next button event listener
// js - nextButton.addEventListener('click',nextQuest);
$(nextButton).on('click',nextQuest)

// prev button event listener
// js - prevButton.addEventListener('click',prevQuest);
$(prevButton).on('click',prevQuest)

// submit button event listener
// js - prevButton.addEventListener('click');
$(submitButton).on('click')


// function defining what is to happen upon quiz start (after start button click event)
function startQuiz(){

    // randomize ("suffle") question order. only needs to occur once.
    randQuestions = shuffle(questions);

    // adding hide class to the start button inorder to remove it from viewport
    // js - startButton.classList.add('hide');
    $(startButton).addClass('hide');

    // replacing quiz instruction text with first question prompt
    // js - questionPrompt.innerHTML = "Question 1";
    $(questionPrompt).text(randQuestions[questionIndex].question);

    // adding answer options programattically using the first element in question.options object array
    questions[questionIndex].options.forEach(answer => {

        // init button varible and create a new button element for each loop itteration
        // js - let button = document.createElement('button');
        let button = $("<button>")

        // create a 3 character unique id to assign to each multiple choise option button. uses first 3 characters of text associated with each button.  
        let buttonId = uniqueId(answer);

        // format button appearance using bootstrap classes 
        // js - button.classList.add('btn','btn-outline-dark','btn-block');
        $(button).addClass('btn btn-outline-dark btn-block chosen');

        // give each button a unique id using the answer it represents
        $(button).attr("id", buttonId);

        // add multiple chois answer text to button
        // js - button.innerHTML = answer;
        $(button).text(answer);

        // append button to answer-button div area
        $("#answer-buttons").append(button);
    })

    // removing hide class to the answer buttons container element, to show first quiz question answers in viewport
    // js - ansContainEl.classList.remove('hide');
    $(ansContainEl).removeClass('hide');

    // removing hide class to the next button element, to show next button in viewport
    // js - nextButton.classList.remove('hide');
    $(nextButton).removeClass('hide');

}


// fucntion that handles multiple choice click events through parent div element answer-buttons 
function selectAns(e){

    // optimization that ensures user is not registering a click on the parent element itself 
    if(e.target !== e.currentTarget) {


        let ansId = uniqueId(questions[questionIndex].answer);

        if(e.target.id == ansId) {
            $('#'+e.target.id).addClass('btn-success');
        }else{
            $('#'+e.target.id).addClass('btn-danger'); 
        }

    }

    e.stopPropagation();

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
    // js - questionPrompt.innerHTML = "Question 1";
    $(questionPrompt).text(randQuestions[questionIndex].question);

    // adding answer options programattically using the first element in question.options object array
    questions[questionIndex].options.forEach(answer => {

        // init button varible and create a new button element for each loop itteration
        // js - let button = document.createElement('button');
        let button = $("<button>")

        // create a 3 character unique id to assign to each multiple choise option button. uses first 3 characters of text associated with each button.  
        let buttonId = uniqueId(answer);

        // format button appearance using bootstrap classes 
        // js - button.classList.add('btn','btn-outline-dark','btn-block');
        $(button).addClass('btn btn-outline-dark btn-block chosen');

        // give each button a unique id using the answer it represents
        $(button).attr("id", buttonId);

        // add multiple choise answer text to button
        // js - button.innerHTML = answer;
        $(button).text(answer);

        // append button to answer-button div area
        $("#answer-buttons").append(button);
    })

    // removing hide class to the prev button element, to show prev button in viewport after the first question
   if(questionIndex == 1) {

        // if on second question show the previous button - will remain active untill submit button is pressed (need to create a submit button)
        // js - prevButton.classList.remove('hide');
        $(prevButton).removeClass('hide');

    }

    // adding hide class to the next button element, to remove next button in viewport in the final question (consider using == 4 instead of > 3 since we are dealing with ints)
    if(questionIndex > 3) {

        // adding hide class to the next button element, to remove next button in viewport
        // js - nextButton.classList.addClass('hide');
        $(nextButton).addClass('hide');

        // removing hide class to the submit button element, to add submit button in viewport
        // js - submitButton.classList.removeClass('hide');
        $(submitButton).removeClass('hide');
    }

}


function prevQuest(){

    // call resetQuestions to remove previous multiple choise answer options
    resetQuestions()

    // next button - qi = 1 for increment; prev button - qi = -1 for decrement of questionIndex
    let qi = -1;

    // call questionState to increment the question state index. keeps track of what question user is on.
    questionState(qi)

    // replacing quiz instruction text with first question prompt
    // js - questionPrompt.innerHTML = "Question 1";
    $(questionPrompt).text(randQuestions[questionIndex].question);

    // adding answer options programattically using the first element in question.options object array
    questions[questionIndex].options.forEach(answer => {

        // init button varible and create a new button element for each loop itteration
        // js - let button = document.createElement('button');
        let button = $("<button>")

        // create a 3 character unique id to assign to each multiple choise option button. uses first 3 characters of text associated with each button.  
        let buttonId = uniqueId(answer);

        // format button appearance using bootstrap classes 
        // js - button.classList.add('btn','btn-outline-dark','btn-block');
        $(button).addClass('btn btn-outline-dark btn-block chosen');

        // give each button a unique id using the answer it represents
        $(button).attr("id", buttonId);

        // add multiple chois answer text to button
        // js - button.innerHTML = answer;
        $(button).text(answer);

        // append button to answer-button div area
        $("#answer-buttons").append(button);
    })

    // removing hide class to the prev button element, to show prev button in viewport
    // js - nextButton.classList.remove('hide');
    if(questionIndex == 0) {

        // if on first question hide the previous button - will likely have to move this to the prev button function once I create it.
        $(prevButton).addClass('hide');

    }

    // remove hide class to the next button element, to add next button back in viewport if prev button is clicked in the final question (consider using == 3 instead of < 4 since we are dealing with ints)
    if(questionIndex < 4) {

        // removing hide class to the next button element, to show next button in viewport
        // js - nextButton.classList.remove('hide');
        $(nextButton).removeClass('hide');

        // adding hide class to the submit button element, to remove submit button in viewport
        // js - submitButton.classList.addClass('hide');
        $(submitButton).addClass('hide');

    }

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

    // do not remove last multiple choise answer option set based on second to last next-button click 
    // if(questionIndex < (questions.length)) {
        
        // remove all child nodes in the answer-buttons div element
        $("#answer-buttons").empty();
    
    // }

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