var count = 0;
var timerEl = document.querySelector("#timer");
var buttonEl = document.querySelector("#trigger");

buttonEl.addEventListener("click", quizMe);

function quizMe(event){
    event.preventDefault();
    if (buttonEl.textContent === "Start") {
        buttonEl.textContent = "End";
        timerEl.textContent = "0:00";
        var timerInterval = setInterval(function() {
            if (buttonEl.textContent === 'Start') {
                clearInterval(timerInterval);
            } else {
                count+=1;
                var minutes = Math.floor(count/60);
                //always shows seconds as 2 digits
                if (count%60>=10){
                    var seconds = count%60;
                } else {
                    seconds = "0" + count%60;
                }
                timerEl.textContent = minutes + ":" + seconds;
            }
        },1000);
    } else {
        buttonEl.textContent = "Start";
        timerEl.textContent = "";
        count = 0;
    }
}

// function timerFunction() {
//     if (buttonEl.textContent === 'Start') {
//         clearInterval(timerInterval);
//         timerEl.textContent = "";
//         count = 0;
//     } else {
//         count+=1;
//         var minutes = Math.floor(count/60);
//         //always shows seconds as 2 digits
//         if (count%60>=10){
//             var seconds = count%60;
//         } else {
//             seconds = "0" + count%60;
//         }
//         timerEl.textContent = minutes + ":" + seconds;
//     }
// }