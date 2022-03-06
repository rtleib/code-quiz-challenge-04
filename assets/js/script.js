var timerEl = document.getElementById("countdown")
var mainEl = document.getElementById("main")
var startButton = document.getElementById("start-button")
var questionText = document.querySelector(".questions")
var answerAText = document.getElementById("answerA")
var answerBText = document.getElementById("answerB")
var answerCText = document.getElementById("answerC")
var answerDText = document.getElementById("answerD")


function countdown() {
    var timeLeft = 75;
    var timeInterval = setInterval(function(){
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft === 0) {
            clearInterval(timeInterval)
        }
    }, 1000);
}
countdown();

function generateQuiz(questions){
}

function showQuestions(questions){}
var questionsArr = [
    {
        question: "testing",
        answerA: "testAnswer"
    }
]
function quizInfo() {
    questionText.textContent = questionsArr[0].question
}
startButton.addEventListener("click", quizInfo);