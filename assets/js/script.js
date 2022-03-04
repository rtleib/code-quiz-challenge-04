var timerEl = document.getElementById("countdown")
var mainEl = document.getElementById("main")

countdown();
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
