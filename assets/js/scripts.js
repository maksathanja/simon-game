/* eslint-env jquery */
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).on("keydown", function() {
  if (!gameStarted) {
    // $("#level-title").text(`Level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

// Play on click
$(".btn").on("click", function() {
  const userChosenColor = $(this).attr("id"); /* or this.id */
  userClickedPattern.push(userChosenColor);
  // Animate the userChosenColor and play its sound
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Continue game
const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  // create randomChosenColor
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // blink and play the sound of randomChosenColor
  blink(randomChosenColor);
  playSound(randomChosenColor);
};

const checkAnswer = lastColor => {
  if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over. Press Any Key to Restart");

    restart();
  }
};

// *** Functions ***
// Blink the button
const blink = button => {
  $(`#${button}`)
    // .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};

// Create sound location and play
const playSound = chosenColor => {
  const audio = new Audio(`assets/sounds/${chosenColor}.mp3`);
  audio.play();
};

// Animate clicked button
const animatePress = currentColor => {
  $(`.${currentColor}`)
    .addClass("pressed")
    .delay(100) /* setTimeOut(() => {}, 100) */
    .queue(function(next) {
      $(this).removeClass("pressed");
      next();
    });
};

// Restart Game
const restart = () => {
  level = 0;
  gamePattern = [];
  gameStarted = false;
};
