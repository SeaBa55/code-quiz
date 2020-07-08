// init object array for question, multiple choice options, and corresponding answers
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

// init global variable for question prompt text
// js - var questionPrompt = document.getElementById('question-prompt');
var questionPrompt = $('#question-prompt');

// init global start-button variable
// js - var startButton = document.getElementById('start-btn');
var startButton = $('#start-btn');

// init global previous-button variable
// js - var prevButton = document.getElementById('prev-btn');
var prevButton = $('#prev-btn');

// init global next-button variable
// js - var nextButton = document.getElementById('next-btn');
var nextButton = $('#next-btn');

// init global variable for answer buttons container element 
// js - var ansContainEl = document.getElementById('answer-buttons');
var ansContainEl = $('#answer-buttons');

// start button event listener
// js - startButton.addEventListener('click',startQuiz);
$(startButton).on('click',startQuiz)

// function defining what is to happen upon quiz start
function startQuiz(){

    // randomize ("suffle") question order
    randQuestions = shuffle(questions);

    // adding hide class to the start button inorder to remove it from viewport
    // js - startButton.classList.add('hide');
    $(startButton).addClass('hide');

    // replacing quiz instruction text with first question prompt
    // js - questionPrompt.innerHTML = "Question 1";
    $(questionPrompt).text(randQuestions[0].question);

    // adding answer options programattically using the first element in question.options object array
    questions[0].options.forEach(answer => {

        // init button varible and create a new button element for each loop itteration
        // js - let button = document.createElement('button');
        let button = $("<button>")

        // format button appearance using bootstrap classes 
        // js - button.classList.add('btn','btn-outline-dark','btn-block');
        $(button).addClass('btn btn-outline-dark btn-block');

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