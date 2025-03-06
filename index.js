var buttonColours = ["green","red","yellow","blue"];
var systemGeneratedSequence = [];
var userChosenSequence = [];
var level = 0;
var gameStarted = false;

$(document).keypress(function() {
    if(gameStarted===false){                                                
        document.getElementById("level-title").innerHTML = "Level "+ level;
        sequenceGeneration();
        gameStarted = true;  
    }
});

$(".btn").click(function(){

    var idOfTheButtonClicked = $(this).attr("id");
    userChosenSequence.push(idOfTheButtonClicked);

    pressAnimation(idOfTheButtonClicked);
    audioPlay(idOfTheButtonClicked);
    
    answerCheck(userChosenSequence.length-1);    
});

function answerCheck(currentLevel){
    if(systemGeneratedSequence[currentLevel]===userChosenSequence[currentLevel]){
        if(userChosenSequence.length===systemGeneratedSequence.length){
            setTimeout(function(){
              sequenceGeneration();
            },200);
        }
    }
    else{
        audioPlay("wrong");
        
        document.getElementById("level-title").innerHTML = "You Lost. Press any key to Retry";
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        startOver();
    }
}

function sequenceGeneration (){
    userChosenSequence = [];
    level++;
    document.getElementById("level-title").innerHTML = "Level "+ level;
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColourFromButtonColoursArray = buttonColours[randomNumber];
    systemGeneratedSequence.push(randomChosenColourFromButtonColoursArray);
    
    $("#" + randomChosenColourFromButtonColoursArray).fadeIn(100).fadeOut(100).fadeIn(100);
    audioPlay(randomChosenColourFromButtonColoursArray);
}

function audioPlay(clickedButtonsID){
    var audio = new Audio("./sounds/" + clickedButtonsID + ".mp3");
    audio.play();
}

function pressAnimation(idOfTheButton){

    $("#" + idOfTheButton).addClass("pressed");
    setTimeout(function(){
        $("#" + idOfTheButton).removeClass("pressed")},100);
}

function startOver(){
    level = 0;
    systemGeneratedSequence = [];
    gameStarted = false;
}