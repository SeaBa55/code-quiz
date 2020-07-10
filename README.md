# 04 Web APIs: Code Quiz

As you proceed in your career as a web developer, you will probably be asked to complete a coding assessment, which is typically a combination of multiple-choice questions and interactive challenges. Build a timed code quiz with multiple-choice questions. This app will run in the browser and feature dynamically updated HTML and CSS powered by your JavaScript code. It will also feature a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

## User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

The following animation demonstrates the application functionality:

![code quiz](./Assets/04-web-apis-homework-demo.gif)

### Review

You are required to submit the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

### Version History

code_quiz_v1.0 - Implementing template from js_password_generator assignment (Nav bar, background, card layout and sticky footer)(index.html & style.css); Also added container for questions, multiple choise buttons for answers, and Start/Next buttons for quiz navigation controls (index.html lines 44-51, 55-60). 

code_quiz_v1.1 - Added bootstrap classes to all butons to further style their default look (index.html lines 46-49, 57-58).

code_quiz_v1.2 - Moved "hide" class from "card-body" div container to the "answer-buttons" div container (index.html line 44); Added a previous button to potentially give the user a way to navegate backward to review their answers (index.html line 58); Added a margin of 8px between last answer button and the control buttons, also centered the control buttons (style.css lines 41, 43); Commented hide class selector to play with page appearance on the fly (development only)(style.css lines 46-48); Created empty script.js file in Assests, and uncommented the javascript relative path (index.html line 83).

code_quiz_v1.3 - Removed div tag that was not being used (index.html line 53); Changed id tag to "question-promt" for greater specificity (index.html line 39); Added a line heigh of 25px to create a known amount of space in the line-break below the line divider and the first answer button, and chnged the margin between last answer button and control buttons to match (style.css lines 11, 45); Uncommented hide class selector since it is now referenced in my script file (style.css lines 50-52); Added jQuery CDN (index.html line 83); Added javascript to hide start button upon click event, populate inital question & answers set, and provide a next button to allow user to cycle to the next question & answer set (writing in javascript, however, also attempting to repalce with jQuery to learn how it works - please ignore commented js lines above the equivalent jQuery code - will remove from final)(script.js lines 1-33).

code_quiz_v1.4 - Added questions object array containing question prompts, multiple choice options, and corresponding answers (script.js lines 2-23); Added a shuffling function using Fisher–Yates method to randomize the order of the questions (script.js lines 74-90); Changed first question prompt to read the question from the first index of the random questions array (script.js line 61); Created function to programatically add buttons to the answer buttons container element (script.js lines 64-80); Commented-out hard-coded answer button (index.html lines 49-62).

code_quiz_v1.5 - Added next button event listener (script.js line 54); Added nextQuest function to display next question and multiple choise options to the viewport (script.js lines 101-149); Added questionState function to keep track of what question user is on with questionIndex (nextQuest fucntion passes qi = 1 for increment of questionIndex and in the future a prevQuest fucntion will pass qi = -1 for decrement of questionIndex)(script.js lines 152-160); Added resetQuestions function to remove previous multiple choise answer options prior to appending new ones in the nextQuest fucntion (script.js lines 163-173).

code_quiz_v1.6 - Added next button event listener (script.js line 67); Added prevQuest function which gives the newly added prev button the ability to go back a question set (script.js lines 211 - 249); Removed next button on final question which was the real reason the answers were disappearing on the final question (script.js line 201); Added submit button and coresponding event listener (inert - for future use)(index.html line 62)(script.js lines 51, 71); Added event listener to the multiple choise button's parent element which is used to catch on-click events of its childen (script.js lines 35, 55); Added selectAns function that handles multiple choice on-click events through parent div element answer-buttons, and adds class "btn-success" to correct, and "btn-danger" to wrong answer button selection (script.js lines 125-143), Added function to create unique id selectors, which are assigned each multiple choise button. Each unique id is named after the first 3 characters of the answer it represents (used in selectAns function)(script.js lines 322-335) added color btn-success to correct, and btn-danger to wrong answers.

code_quiz_v1.7 - Changed the foreach loop parameter "answer" to "ans" so as not to confuse it with the questions array string parameter for the correct answer which is also called "answer" (script.js lines 89, 96, 107, 173, 180, 191, 237, 244, 255); Removed commented-out hard-coded multiple choise option buttons (index.html lines 49-52); Removed commented-out base-javascript lines from script.js; Added "userAnswers" array to keep track of user answers for each question (script.js line 26). This is used this the selectAns function to lock users out of re-answering previously worked questions (script.js line 115); Users can navigate around without answering questions, however, when they do make a selection the "userAswers" array is updated in the selectAns function (script.js line 121); The "userAnswers" array is also used in the nextQuest and prevQuest functions in order to update the styling of already answered multiple choise selections with the appropriate button color (script.js lines 190-194, 253-257); Added prevAnsStyle function to handle the styling of previously answered question multiple choise buttons (script.js 282-303). Added "userCorrect" global variable to keep track of the users correct answer count. This parameter is increment the selectAns function for correct answers only (to be used for user-score calculation upon submit button on-click event)(script.js lines 29, 133).

code_quiz_v1.8 - Removed the conditional statment that checks if user has already answerd the current question being presented in the viewport within the nextQuest and prevQuest functions and moved them to the prevAnsStyle function to only have it written once (script.js lines 279, 299); Changed inital quiz instruction prompt from "You will have 5 min to complete this quiz!" to "You will have 1 min to complete this quiz!" (index.html line 39); Changed card-body container div element id to "quiz-container" for for greater specificity (index.html line 36); Added global var userScore and results fucntion call on submit button (script.js lines 32, 68); Added results function which calculates the user's socre and creates new div elements to display result info in viewport (executes upon submit button click)(script.js lines 306-327).

code_quiz_v1.9 - Added from elements to the results section, included is a place to type intials, a save button, and a div element area for the saved information to be displayed (titled 'Your Score History')(script.js lines 318-363). Added padding of 15px to the top of the save button and form group to create a little visual spacing between the results elements (styles.css lines 54-56).

code_quiz_v2.0 - Added timer display area in the nav bar, using a input box as display (index.html lines 26-29); Added styling to both the timer display and the timer label (style.css lines 7-18); Added global variable "starTimer" used to start the time keeping function, and global variable "secondsLeft" for allotted quiz duration (also used for timer manipulation based on wrong answer selections)(script.js lines 38,41); Set "starTimer" variable equal to 1 in the startQuiz function to activate the timer upon quiz start (script.js line 81); Added timekeeping function using setTime() javascript method discussed in class. This function updates the timer display every second (script.js lines 448-485); Added timer variable "secondsLeft" to the selectAns function, where incorrect answers are processed. 30 seconds are subtracted from it to add time penalty for incorrect answer selection (script.js line 153).

code_quiz_v2.1 - Polished style of results section, added initial functionality to the the save button, and added a retry button that reloads the page (retry button can bypass the save feature, but is also availible after saving)(script.js lines 330-427); Added styling to the form button controls and the score history section (style.css 70-82); Removed class "btn-outline-dark" from the selected answes in the quiz to better visualize if the selection was wright or wrong (in mobile devices the "btn-outline-dark" styling would rened the selection dark until you came back to that question)(script.js lines 143, 153);

## To-Do

Promot for initials and save results for highscore (JSON), else there is option to quit (restarts without saving)

## Wish List

Display the number of unanswered questions remaining till completion.

Remove highlighted border around next and prev button when on next question after having pressed either button previously.

Replace control buttons event listeners with one event listener, using the parent class "controls". Better practice, moving forward, as it is less taxing on memory and cleaner to debug/ look at.

Consolidate the "foreach" loops that create the multiple choise buttons within startQuiz, nextQuest, and prevQuest functions into one function to tidy up javascript. 

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
