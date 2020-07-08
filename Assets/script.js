// init global variable for question prompt text
// var questionPrompt = document.getElementById('question-prompt');
var questionPrompt = $('#question-prompt');
// init global start-button variable
// var startButton = document.getElementById('start-btn');
var startButton = $('#start-btn');
// init global previous-button variable
var prevButton = document.getElementById('prev-btn');
// init global next-button variable
var nextButton = document.getElementById('next-btn');

// init global variable for answer buttons container element 
var ansContainEl = document.getElementById('answer-buttons');

// start button event listener
// startButton.addEventListener('click',startQuiz);
$(startButton).on('click',startQuiz)

// function defining what is to happen upon quiz start
function startQuiz(){
    // adding hide class to the start button inorder to remove it from viewport
    // startButton.classList.add('hide');
    $(startButton).addClass('hide');
    // replacing quiz instruction text with first question prompt
    // questionPrompt.innerHTML = "Question 1";
    $(questionPrompt).text('Question 1');
    // removing hide class to the answer buttons container element, to show first quiz question answers in viewport
    // ansContainEl.classList.remove('hide');
    $(ansContainEl).removeClass('hide');
    // removing hide class to the next button element, to show next button in viewport
    // nextButton.classList.remove('hide');
    $(nextButton).removeClass('hide');
}