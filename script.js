"use strict";

const player1 = document.querySelector('[data-testid="player-1"]');
const player2 = document.querySelector('[data-testid="player-2"]');

const player1TotalScore = document.querySelector(
  '[data-testid="player-1"] .player-total-score'
);
const player2TotalScore = document.querySelector(
  '[data-testid="player-2"] .player-total-score'
);

const player1CurrentScore = document.querySelector(
  '[data-testid="player-1"] .current-score-container .current-score'
);
const player2CurrentScore = document.querySelector(
  '[data-testid="player-2"] .current-score-container .current-score'
);

const dice = document.querySelector(".dice-image");

function setActivePlayer(player) {
  player1.classList.remove("player-active");
  player2.classList.remove("player-active");

  player.classList.add("player-active");
}

function hideDice() {
  dice.classList.add("hidden");
}

function showDice() {
  dice.classList.remove("hidden");
}

function resetGame() {
  player1TotalScore.textContent =
  player2TotalScore.textContent =
  player1CurrentScore.textContent =
  player2CurrentScore.textContent =
  0;

  hideDice();
  setActivePlayer(player1);
}

function startGame() {
  resetGame();
}

startGame();