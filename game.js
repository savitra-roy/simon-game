var buttonColor = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var started = false;
var userClickedPattern = [];
var wrong= new Audio("sounds/wrong.mp3");

//////////////detecting keypress//////////////////////
$(document).on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  nextSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});



//////////////////////////////////////////////////////////////////////////////////
function nextSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");

  }, 100);
//////////////////////////////////////////////////////////////////////////////////
}
function nextSequence() {
  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);



  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  nextSound(randomChosenColor);
  animatePress(randomChosenColor);

}

function checkAnswer(currentLevel)
{
if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
{
  if(userClickedPattern.length==gamePattern.length ){
    setTimeout(function()
  {
    nextSequence();
  },1000);
  userClickedPattern=[];
  }
}
else
{
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart" );
  startOver();
}
}
function startOver()
{
 level=0;
 gamePattern = [];
 userClickedPattern = [];
 started = false;

}
