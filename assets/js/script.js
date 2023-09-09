//TODO: add highscore sorting
var timeLimit = 40; //timer starting time
var count = timeLimit;
var questions = [
    "Which of the following keywords is used to define a variable in Javascript?",
    "How do you stop an interval timer in Javascript?",
    "How do you write a comment in css?",
    "What is 3+5?",
    "Is the answer to this question #1?"];
var answers1 = [
    "var",
    "clearInterval",
    "//",
    "7",
    "yes"];
var answers2 = [
    "let",
    "clearTimer",
    "```",
    "8",
    "no"];
var answers3 = [
    "both a and b",
    "intervalOver",
    "#",
    "9",
    "no"];
var answers4 = [
    "None of the above",
    "None of the above",
    "/* */",
    "35",
    "no"];
var correctAnswers = [
    "answer3",
    "answer1", 
    "answer4",
    "answer2",
    "answer1"];
var highscoreList = [];
var questionIndex = 0;
var score = 0;
var questionWeight = 10; //amount of points awarded on correct answer
var incorrectPenalty = Math.floor(timeLimit/questions.length); //time deducted on incorrect answer
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
    section.setAttribute("style", "display: none;");
}

//show all children within section with given id
function displayById(idTag) {
    hideById(activeId)
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
highscoresEl.addEventListener("click", function() {showHighscore();})
function showHighscore(){
    highscoresEl.setAttribute("style", "display: none;");
    recallId = activeId;
    displayById("#score-screen");
}

goBackHS.addEventListener("click", function() {
    displayById(recallId);
    highscoresEl.setAttribute("style", "display: default;");
}) //return to screen before high scores

resetHS.addEventListener("click", clearHighscores)
function clearHighscores() {
    highscoreList = [];
    emptyScoreList();  
}

function emptyScoreList() {
    while (scoreListEl.firstChild) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
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
    // checks if name input is empty before adding to highscore list
    if (nameInput.value !== "") {
        highscoreList.push({name: nameInput.value, userScore:score});
    } else {
        highscoreList.push({name: "noname", userScore:score});
    }
    highscoreList.sort(function(a,b) {return b.userScore - a.userScore}); // sorts highscore list from high to low
    emptyScoreList();
    for (i=0;i<highscoreList.length;i++) {
        var hsListEntry = document.createElement("li");
        hsListEntry.textContent = highscoreList[i].name + ": " + highscoreList[i].userScore;
        scoreListEl.appendChild(hsListEntry);
    }
    showHighscore();
    recallId="#start-screen"; //pressing 'go back' in high-scores will take you to start-screen
}