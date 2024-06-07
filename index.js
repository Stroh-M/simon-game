var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


    /* Check if variable started is not true, 
    if it's not true then do the code in the curly braces */
    $(document).keypress(function (){
        if (!started) {
           $("#level-title").text("level" + level);
           nextSequence();
           started = true; 
        }
    })


// Event listener for the divs with the class btn.
$(".btn").click(function () {
    // Creating variable containing the clicked divs id attribute. 
    var userChosenColor = $(this).attr("id");
    // Adding the variable created above to the userClicked array.    
    userClickedPattern.push(userChosenColor);
    // Calling function to play corresponding sound for the color clicked.
    playSound(userChosenColor);
    // Calling function to add animation when user clicks button.
    animatePress($(this).attr("id"));
    // Call function to check user answer
    checkAnswer(userClickedPattern.length-1);
    
});


function nextSequence() {
    userClickedPattern = [];

    $("#level-title").text("Level " + level);
    level++;
    // Picks random color.
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    
    // Adds a random color to the end of the game pattern array.
    gamePattern.push(randomChosenColor);
    
    // Selected random color flashes.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    document

    // Plays sound of the color selected.
    playSound(randomChosenColor);
    
}




function playSound(name) {
    // Creates variable containing audio sound.
    var sound = new Audio("./sounds/" + name + ".mp3");
    // Plays sound.
    sound.play();
}

function animatePress(currentColor) {
    // Adds class pressed to the id selected.
    $("#" + currentColor).addClass("pressed");
    // Sets a delay to remove the pressed class from the id selected.
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);    
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
     if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }} else {
        console.log("wrong");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        
        $("body").addClass("game-over");
        setTimeout(function (){
        $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over, Press Any Key To Restart");
        
        startOver(); 
    }   
}


function startOver() {
    started = false;
    gamePattern = [];
    level = 1;
}

/**/
