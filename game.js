var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var answerIndex = 0;

$(document).keypress(function(){
    if (level === 0) {
        nextSequence();
    }

});

function nextSequence() {
    answerIndex = 0;
    userClickedPattern = [];
    var randomChosenColor = buttonColors[randomNumber()];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        var gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        var lost = true;
        return lost;
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    answerIndex = 0;
}

function playSound(name) {
    var playSound = new Audio("./sounds/" + name + ".mp3");
    playSound.play();
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    $("#" + userChosenColor).fadeOut(100).fadeIn(100);
    animatePress(userChosenColor);
    checkAnswer(answerIndex);
    answerIndex++;
    if (lost != true) {
        playSound(userChosenColor);
    }
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function randomNumber() {
    return Math.floor(Math.random()*4);
}

