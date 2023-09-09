var timeLimit = 40; //timer starting time
var count = timeLimit;
var highscoreList = [];
var questionIndex = 0;
var score = 0;
var questions = ["The answer is #4", "The answer is #2","The answer is #4", "The answer is #3", "The answer is #1"];
var answers1 = ["no", "no", "no", "no", "yesssss"];
var answers2 = ["no", "yess", "no", "no", "no"];
var answers3 = ["no", "no", "no", "yessss", "no"];
var answers4 = ["yes", "no", "yesss", "no", "no"];
var correctAnswers = ["answer4", "answer2", "answer4", "answer3", "answer1"];

//elements in header
var highscoresEl = document.querySelector("#highscores"); //view high scores (top right of screen)
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




buttonEl.addEventListener("click", startQuiz);
function startQuiz(){
    hideById("#start-screen");
    displayById("#question-screen");
    count = timeLimit;
    score = 0;
    questionIndex=0;
    timerEl.textContent = "Time: " + timeLimit;
    askQuestion(questionIndex);
    var timerInterval = setInterval(function() {
        if (count <= 0) { //Stops when time is up
            clearInterval(timerInterval);
            timerEl.textContent = "";
            resultEl.textContent = "";
            scoreEl.textContent = "Your final score is "+ score;
            displayById("#results-screen");
            hideById("#question-screen");
        } else { //updates timer
            count--;
            timerEl.textContent = "Time: " + Math.max(count,0);
        }
    },1000);
}

function askQuestion(number) {
    questionEl.textContent = questions[number];
    answer1El.textContent = answers1[number];
    answer2El.textContent = answers2[number];
    answer3El.textContent = answers3[number];
    answer4El.textContent = answers4[number];
}

highscoresEl.addEventListener("click", showHighscores)
function showHighscores() {
    hideById("#start-screen");
    displayById("#score-screen");
}

goBackHS.addEventListener("click", hideHighscores)
function hideHighscores(){
    hideById("#score-screen");
    displayById("#start-screen");
}

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
            score++;
            resultEl.textContent = "Correct";
        } else {
            resultEl.textContent = "Incorrect"
            count-=10;
            timerEl.textContent = "Time: " + Math.max(count,0)
        }
        questionIndex++;
        if (questionIndex === questions.length){
            alert("finished");
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
    hideById("#results-screen");
}

//goal: hide section with given id tag and all children
function hideById(idTag) {
    var section = document.querySelector(idTag);
    for (var i=0;i<section.children.length;i++) {
        section.children[i].setAttribute("style", "display: none;")
    }
}

//goal: show section with given id tag and all children
function displayById(idTag) {
    var section = document.querySelector(idTag);
    for (var i=0;i<section.children.length;i++) {
        section.children[i].setAttribute("style", "display: block;")
    }
}

