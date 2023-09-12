var timeLimit = 60; //timer starting time
var count = timeLimit;
var questions = [
    "Which of the following keywords is used to define a variable in Javascript?",
    "How do you stop an interval timer in Javascript?",
    "How do you write a comment in css?",
    "What is 3+5?",
    "Which of the following is a possible value for a boolean?"];
var answers1 = [
    "var",
    "clearInterval",
    "//",
    "7",
    "true"];
var answers2 = [
    "let",
    "clearTimer",
    "```",
    "8",
    "correct"];
var answers3 = [
    "both a and b",
    "intervalOver",
    "#",
    "9",
    "wrong"];
var answers4 = [
    "None of the above",
    "None of the above",
    "/* */",
    "35",
    "yes"];
var correctAnswers = [
    "answer3",
    "answer1", 
    "answer4",
    "answer2",
    "answer1"];
var highscoreList = [];
var questionIndex = 0;
var score = 0; //tracks score, =remaining time if any questions answered correctly
var numCorrect = 0; //tracks number of questions correctly answered
var incorrectPenalty = Math.floor(timeLimit/questions.length); //time deducted on incorrect answer
var isDone = false;
var activeId = "#start-screen"; //starts by displaying start screen
var recallId; 

//elements in header
var highscoresEl = document.querySelector("#view-highscores"); //view highscores (top left of screen)
var timerEl = document.querySelector("#timer");  //quiz timer(top right of screen)

//elements in start screen
var buttonEl = document.querySelector("#trigger"); //start quiz button
//elements in high score screen
var scoreListEl = document.querySelector("#score-list"); //highscores will appear here once submitted
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

//show all children within section with given id and hide previous section
function displayById(idTag) {
    var toHide = document.querySelector(activeId);
    toHide.setAttribute("style", "display: none;");
    activeId=idTag;
    var section = document.querySelector(idTag);
    section.setAttribute("style", "display: block;");
}

//starts timer and goes to first question in quiz
buttonEl.addEventListener("click", startQuiz);
function startQuiz(){
    displayById("#question-screen");
    count = timeLimit;
    score = 0;
    questionIndex=0;
    numCorrect = 0;
    timerEl.textContent = "Time: " + timeLimit;
    isDone = false;
    askQuestion(questionIndex);
    var timerInterval = setInterval(function() {
        if (isDone || count <= 0) { //Stops quiz when all questions answered or when time is up, opens results screen (count can be under 0 due to incorrect answer penalty)
            clearInterval(timerInterval);
            timerEl.textContent = "";
            scoreEl.textContent = "You answered " + numCorrect + "/" + questions.length + " correctly.\nYour final score is "+ score;
            displayById("#results-screen");
        } else { //updates timer
            count--;
            timerEl.textContent = "Time: " + Math.max(count,0);
        }
    },1000);
}

//Opens score-screen when view high scores is clicked (top left of page) and saves id of previous screen.
highscoresEl.addEventListener("click", function() {showHighscore();})
function showHighscore(){
    highscoresEl.setAttribute("style", "display: none;");
    recallId = activeId;
    displayById("#score-screen");
}

//returns from score-screen to the previous screen
goBackHS.addEventListener("click", function() {
    displayById(recallId);
    highscoresEl.setAttribute("style", "display: default;");
})

//Clears high score list if button is pressed
resetHS.addEventListener("click", clearHighscores)
function clearHighscores() {
    highscoreList = [];
    localStorage.setItem("highscoreList", JSON.stringify(highscoreList));
    emptyScoreList();  
}

function emptyScoreList() {
    while (scoreListEl.firstChild) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
}

//checks if correct answer is correct or incorrect on click and proceeds to next question
answerBox.addEventListener("click", isCorrect)
function isCorrect(event) {
    var thingClicked = event.target;
    //check which answer has been clicked
    if (thingClicked.matches("button")) {
        var guess = thingClicked.getAttribute("id");
        if (guess === correctAnswers[questionIndex]) {
            numCorrect++;
            resultEl.textContent = "Correct";
        } else {
            resultEl.textContent = "Incorrect"
            count-=incorrectPenalty;
            timerEl.textContent = "Time: " + Math.max(count,0)
        }
        //displays result for 500ms
        resultEl.setAttribute("style", "display: block;");
        setTimeout(function() {
            resultEl.setAttribute("style", "display: none;");
        },500);
        //proceeds to next question, or ends quiz if on final question
        questionIndex++;
        if (questionIndex === questions.length){
            if (numCorrect > 0) {
            score+=count; // adding remaining time to final score
            } else {
                score = Math.min(count,0); //score is negative or zero if no questions answered correctly
            }
            isDone = true;
        } else {
        askQuestion(questionIndex);
        }
    }
}

//submits name and score to highscore list and displays list
submitEl.addEventListener("click", addScore)
function addScore() {
    // checks if name input is empty before adding to highscore list
    if (nameInput.value !== "") {
        highscoreList.push({name: nameInput.value, userScore:score});
    } else {
        highscoreList.push({name: "noname", userScore:score});
    }
    highscoreList.sort(function(a,b) {return b.userScore - a.userScore}); // sorts highscore list from high to low
    localStorage.setItem("highscoreList", JSON.stringify(highscoreList));
    emptyScoreList();
    for (i=0;i<highscoreList.length;i++) {
        var hsListEntry = document.createElement("li");
        hsListEntry.textContent = highscoreList[i].name + ": " + highscoreList[i].userScore;
        scoreListEl.appendChild(hsListEntry);
    }
    showHighscore();
    recallId="#start-screen"; //manually sets the 'go back' button on score screen to return to start screen
}

function init() {
    highscoreList = JSON.parse(localStorage.getItem("highscoreList"))
    if (highscoreList !== null) {
        for (i=0;i<highscoreList.length;i++) {
            var hsListEntry = document.createElement("li");
            hsListEntry.textContent = highscoreList[i].name + ": " + highscoreList[i].userScore;
            scoreListEl.appendChild(hsListEntry);
        }
    }
}

init();