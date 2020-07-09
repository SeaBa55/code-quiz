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

## To-Do

Add function to keep track of right vs. wrong answer count

Add function to prevent user from going back to change answers (only allowed to view previous answers)

Create timer and timer display area

Report score

Promot for initials and save results for highscore (JSON), else there is option to quit (restarts without saving) 

## Wish List

Removed highlighted border around next and prev button when on next question after having pressed either button previously

Replace control buttons event listeners with on event listener using the parent class "controls". Better practice moving forward as it is less taxin on memory and cleaner to debug/ look at.

Consolidate the "foreach" loops that create the multiple choise buttons within startQuiz, nextQuest, and prevQuest functions into one function to tidy up javascript. 

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
