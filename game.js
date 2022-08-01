var userClickedPattern = [];
var gamepattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keydown", function() {
  if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }

})

$(".btn").on("click", function(e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamepattern.length === userClickedPattern.length) {
      setTimeout(function() {
        //your code to be executed after 1 second
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      //your code to be executed after 1 second
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}

function startOver(){
  level = 0;
  gamepattern=[];
  userClickedPattern=[];
  started = false;
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamepattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  level++;
  $("h1").text("Level " + level);
}

function playSound(color) {
  var audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
