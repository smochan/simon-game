var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence(){
    randomNumber = Math.random();
    randomNumber = ((randomNumber * 4) - (randomNumber * 4) % 1);

    var randomChosenColor =buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(50).fadeOut(50).fadeIn(50);

    playSound(randomChosenColor);
    level += 1; 

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]){
        if(currentLevel == level){
            $("h1").text("level " + (level + 1));
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else{
        $("h1").text("Wrong!, Press a key to start again")
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 400);
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}

$(document).keypress(function(){
    if(level == 0){
        $("h1").text("level " + (level + 1));
    nextSequence();
    }
});

$(".btn").on("click", function(event){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
});

// $(document).keypress(function(event){
//     nextSequence();
// });


