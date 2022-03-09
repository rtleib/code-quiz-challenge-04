var curQuestion = 0;
var questions = document.querySelector("#questions");
var timer = document.querySelector("#time");
var choices = document.querySelector("#answerChoice");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");
var initials = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");
var points = document.querySelector("#highScores");
var cleared = document.querySelector("#clear");
var questionsArr = [
    {
        question: "Arrays in JavaScript can be used to store _______.",
        answerChoices: ["Other Arrays", "Booleans", "Numbers and strings", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerChoices: ["for loops", "JavaScript", "console.log", "Terminal/Bash"],
        correctAnswer: "console.log"
    },
    {
        question: "String values must be enclosed within _______ when being assisgned to variables.",
        answerChoices: ["Quotes", "Curly Brackets", "Parenthesis", "Commas"],
        correctAnswer: "Quotes"
    },
    {
        question: "The condition in an if/else statement is enclosed with _______.",
        answerChoices: ["Curly Brackets", "Square Brackets", "Quotes", "Parenthesis"],
        correctAnswer: "Curly Brackets"
    },
    {
        question: "Commonly used data types DO NOT include:",
        answerChoices: ["Numbers", "Strings", "Booleans", "Alerts"],
        correctAnswer: "Alerts"
    }
]
var time = questionsArr.length * 10;
var timerId= 0;
function timerCount(){
    time--;
    timer.textContent=time;
    if(time <= 0){
        endQuiz();
    }
}
function startQuiz(){
    var startScreen = document.getElementById("starting");
    startScreen.setAttribute("class", "hide");
    questions.removeAttribute("class");
    timerId = setInterval(timerCount, 1000);
    timer.textContent = time;
    showQuestions();
}
function endQuiz(){
    clearInterval(timerId);
    var endScreen = document.getElementById("ending");
    endScreen.removeAttribute("class");
    var finalScore = document.getElementById("finalScore");
    finalScore.textContent= time;
    questions.setAttribute("class","hide");
}
function showQuestions(){
    var currentQuestion = questionsArr[curQuestion];
    var title = document.getElementById("question");
    title.textContent = currentQuestion.question;
    choices.innerHTML="";
    currentQuestion.answerChoices.forEach(function(choice, i){
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choices");
        choiceButton.setAttribute("value", choice);
        choiceButton.textContent = i + 1 + ". " + choice;
        choiceButton.onclick = clicked;
        choices.appendChild(choiceButton);
    });
}
function clicked(){
    if (this.value !== questionsArr[curQuestion].correctAnswer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timer.textContent = time;
        feedback.textContent = "Wrong!";
        feedback.style.color = "red";
    }else{
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    }
    feedback.setAttribute("class", "feedback");
    setTimeout(function() {
        feedback.setAttribute("class", "feedback hide");
    }, 700);
    curQuestion++;
    if (curQuestion === questionsArr.length) {
        endQuiz();
    }else{
        showQuestions();
    }
}
function saveHighscore() {
    var curinitials = initials.value.trim();
    cleared.removeAttribute("class");
    if (curinitials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];  
        var curScore = {
            score: time,
            indivInitials: curinitials
        };
        highscores.push(curScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "index.html";
    }
}
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
    cleared.setAttribute("class", "hide");
}
function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
    highscores.forEach(function(score) {
        var table = document.getElementById("highScores");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = score.indivInitials;
        cell2.innerHTML = score.score;
    });
}
submitButton.addEventListener("click", saveHighscore);
startButton.addEventListener("click", startQuiz);
document.getElementById("clear").onclick = clearHighscores;
printHighscores();