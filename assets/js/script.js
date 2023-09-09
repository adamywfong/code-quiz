//TODO: add highscore sorting
var timeLimit = 40; //timer starting time
var count = timeLimit;
var highscoreList = [];
var questionIndex = 0;
var score = 0;
var questionWeight = 10; //amount of points awarded on correct answer
var incorrectPenalty = 10; //time deducted on incorrect answer
var questions = ["The answer is #4", "The answer is #2","The answer is #4", "The answer is #3", "The answer is #1"];
var answers1 = ["no", "no", "no", "no", "yesssss"];
var answers2 = ["no", "yess", "no", "no", "no"];
var answers3 = ["no", "no", "no", "yessss", "no"];
var answers4 = ["yes", "no", "yesss", "no", "no"];
var correctAnswers = ["answer4", "answer2", "answer4", "answer3", "answer1"];
var activeId = "#start-screen";
var recallId; 

//elements in header
var highscoresEl = document.querySelector("#view-highscores"); //view highscores (top left of screen)
var timerEl = document.querySelector("#timer");  //quiz timer(top right of screen)

//elements in start screen
var buttonEl = document.querySelector("#trigger"); //start quiz button
//elements in high score screen
var scoreListEl = document.querySelector("#score-list");
var goBackHS = document.querySelector("#back-highscores"); //back button for high score screen
var resetHS = document.querySelector("#clear-highscores"); //reset button for list of high scores
//elements in quiz screen
var questionEl = document.querySelector("#question"); //question section of quiz
var answerBox = document.querySelector("#answers"); //unordered list of answers
  var answer1El = document.querySelector("#answer1"); 
  var answer2El = document.querySelector("#answer2"); 
  var answer3El = document.querySelector("#answer3");
  var answer4El = document.querySelector("#answer4");
var resultEl = document.querySelector("#question-result"); //states whether answer is correct or incorrect
//elements in result screen
var scoreEl = document.querySelector("#final-score");
var nameInput = document.querySelector("#name");
var submitEl = document.querySelector("#submit");

//populates questions and answers
function askQuestion(number) {
    questionEl.textContent = questions[number];
    answer1El.textContent = answers1[number];
    answer2El.textContent = answers2[number];
    answer3El.textContent = answers3[number];
    answer4El.textContent = answers4[number];
}

//hide all children within section with given id
function hideById(idTag) {
    var section = document.querySelector(idTag);
    for (var i=0;i<section.children.length;i++) {
        section.children[i].setAttribute("style", "display: none;")
    }
}

//show all children within section with given id
function displayById(idTag) {
    hideById(activeId)
    activeId=idTag;
    var section = document.querySelector(idTag);
    for (var i=0;i<section.children.length;i++) {
        section.children[i].setAttribute("style", "display: block;")
    }
}

//starts timer and goes to first question in quiz
buttonEl.addEventListener("click", startQuiz);
function startQuiz(){
    displayById("#question-screen");
    count = timeLimit;
    score = 0;
    questionIndex=0;
    timerEl.textContent = "Time: " + timeLimit;
    askQuestion(questionIndex);
    var timerInterval = setInterval(function() {
        if (count <= 0) { //Stops quiz when time is up, opens results screen
            clearInterval(timerInterval);
            timerEl.textContent = "";
            resultEl.textContent = "";
            scoreEl.textContent = "Your final score is "+ score;
            displayById("#results-screen");
        } else { //updates timer
            count--;
            timerEl.textContent = "Time: " + Math.max(count,0);
        }
    },1000);
}

//Opens score-screen when view high scores is clicked (top left of page)
highscoresEl.addEventListener("click", showHighscore)
function showHighscore(){
    if (activeId !== "#score-screen") {
        recallId = activeId;
        displayById("#score-screen");
    }
}

goBackHS.addEventListener("click", function() {displayById(recallId);}) //return to screen before high scores

resetHS.addEventListener("click", clearHighscores)
function clearHighscores() {
    highscoreList = [];
    scoreListEl.textContent = highscoreList;
}

answerBox.addEventListener("click", isCorrect)
function isCorrect(event) {
    var thingClicked = event.target;
    if (thingClicked.matches("button")) {
        var guess = thingClicked.getAttribute("id");
        if (guess === correctAnswers[questionIndex]) {
            score+=questionWeight;
            resultEl.textContent = "Correct";
        } else {
            resultEl.textContent = "Incorrect"
            count-=incorrectPenalty;
            timerEl.textContent = "Time: " + Math.max(count,0)
        }
        questionIndex++;
        if (questionIndex === questions.length){
            alert("finished");
            score+=count; // adding remaining time to final score
            count = 0;
        } else {
        askQuestion(questionIndex);
        }
    }
}

submitEl.addEventListener("click", addScore)
function addScore() {
    highscoreList.push(nameInput.value + ": " + score);
    scoreListEl.textContent = highscoreList;
    displayById("#score-screen");
    recallId="#start-screen"; //pressing 'go back' in high-scores will take you to start-screen
}