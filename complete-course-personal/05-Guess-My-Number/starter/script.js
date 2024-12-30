"use strict";

/*
console.log(document.querySelector(".message").textContent);
document.querySelector(".message").textContent = "🔥 Correct number!";
document.querySelector(".number").textContent = "?";
document.querySelector(".score").textContent = "1";

document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/
let numberToGuess = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    document.querySelector(".message").textContent = "No Number";
  } else if (guess !== numberToGuess) {
    if (score > 1) {
      document.querySelector(".message").textContent =
        guess > numberToGuess ? "Too high !" : "Too low !";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "you lost 😡 !";
      document.querySelector(".score").textContent = 0;
    }
  }
  //win the game
  else if (guess === numberToGuess) {
    document.querySelector(".number").textContent = numberToGuess;
    document.querySelector(".message").textContent = "you found it !";
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/

const onAgainClick = function () {
  score = 20;
  numberToGuess = Math.trunc(Math.random() * 20 + 1);

  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = "";
};

document.querySelector(".again").addEventListener("click", onAgainClick);
