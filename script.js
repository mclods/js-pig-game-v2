"use strict";

let PLAYER_1_TOTAL_SCORE,
  PLAYER_2_TOTAL_SCORE,
  ACTIVE_PLAYER_CURRENT_SCORE,
  ACTIVE_PLAYER;

const PLAYER = {
  PLAYER_1: 1,
  PLAYER_2: 2,
};

const DICE_IMG_PATH = "./assets/dice-*.png";
const DICE_ROLL_DURATION_SECONDS = 0.25;

const PLAYER_1_EL = document.querySelector('[data-testid="player-1"]');
const PLAYER_2_EL = document.querySelector('[data-testid="player-2"]');

const PLAYER_1_TOTAL_SCORE_EL = document.querySelector(
  '[data-testid="player-1"] .player-total-score'
);
const PLAYER_2_TOTAL_SCORE_EL = document.querySelector(
  '[data-testid="player-2"] .player-total-score'
);

const PLAYER_1_CURRENT_SCORE_EL = document.querySelector(
  '[data-testid="player-1"] .current-score-container .current-score'
);
const PLAYER_2_CURRENT_SCORE_EL = document.querySelector(
  '[data-testid="player-2"] .current-score-container .current-score'
);

const DICE_IMG = document.querySelector(".dice-image");

function setActivePlayer(player) {
  ACTIVE_PLAYER = player;

  initCurrentScores();
  setActivePlayerWindow();
}

function setActivePlayerTotalScore(score) {
  if (ACTIVE_PLAYER === PLAYER.PLAYER_1) {
    setPlayerTotalScore(PLAYER.PLAYER_1, score);
  } else if (ACTIVE_PLAYER === PLAYER.PLAYER_2) {
    setPlayerTotalScore(PLAYER.PLAYER_2, score);
  } else {
    console.error("Trying to set total score of invalid active player.");
  }
}

function getActivePlayerTotalScore() {
  if (ACTIVE_PLAYER === PLAYER.PLAYER_1) {
    return PLAYER_1_TOTAL_SCORE;
  } else if (ACTIVE_PLAYER === PLAYER.PLAYER_2) {
    return PLAYER_2_TOTAL_SCORE;
  } else {
    console.error("Trying to get total score of invalid active player.");
  }
}

function setActivePlayerCurrentScore(score) {
  ACTIVE_PLAYER_CURRENT_SCORE = score;

  if (ACTIVE_PLAYER === PLAYER.PLAYER_1) {
    setPlayerCurrentScore(PLAYER.PLAYER_1, score);
  } else if (ACTIVE_PLAYER === PLAYER.PLAYER_2) {
    setPlayerCurrentScore(PLAYER.PLAYER_2, score);
  } else {
    console.error("Trying to set current score of invalid active player.");
  }
}

function setActivePlayerWindow() {
  if (ACTIVE_PLAYER === PLAYER.PLAYER_1) {
    PLAYER_2_EL.classList.remove("player-active");
    PLAYER_1_EL.classList.add("player-active");

    console.log("Setting player 1 window as active");
  } else if (ACTIVE_PLAYER === PLAYER.PLAYER_2) {
    PLAYER_1_EL.classList.remove("player-active");
    PLAYER_2_EL.classList.add("player-active");

    console.log("Setting player 2 window as active");
  } else {
    console.error("Trying to set invalid active player window.");
  }
}

function toggleActivePlayer() {
  if (ACTIVE_PLAYER === PLAYER.PLAYER_1) {
    setActivePlayer(PLAYER.PLAYER_2);
  } else if (ACTIVE_PLAYER === PLAYER.PLAYER_2) {
    setActivePlayer(PLAYER.PLAYER_1);
  } else {
    console.error("Trying to toggle invalid active player.");
  }
}

function setPlayerTotalScore(player, score) {
  if (player === PLAYER.PLAYER_1) {
    PLAYER_1_TOTAL_SCORE = PLAYER_1_TOTAL_SCORE_EL.textContent = score;

    console.log(`Setting player 1 total score: ${score}`);
  } else if (player === PLAYER.PLAYER_2) {
    PLAYER_2_TOTAL_SCORE = PLAYER_2_TOTAL_SCORE_EL.textContent = score;

    console.log(`Setting player 2 total score: ${score}`);
  } else {
    console.error("Trying to set total score of invalid player.");
  }
}

function setPlayerCurrentScore(player, score) {
  if (player === PLAYER.PLAYER_1) {
    PLAYER_1_CURRENT_SCORE_EL.textContent = score;

    console.log(`Setting player 1 current score: ${score}`);
  } else if (player === PLAYER.PLAYER_2) {
    PLAYER_2_CURRENT_SCORE_EL.textContent = score;

    console.log(`Setting player 2 current score: ${score}`);
  } else {
    console.error("Trying to set current score of invalid player.");
  }
}

function hideDice() {
  DICE_IMG.classList.add("hidden");
  console.log("Dice is hidden");
}

function showDice() {
  DICE_IMG.classList.remove("hidden");
  console.log("Dice is visible");
}

function addDiceRollTransition() {
  DICE_IMG.style.transition = `transform ${DICE_ROLL_DURATION_SECONDS}s ease-in-out`;
  DICE_IMG.style.transform = "rotate(360deg)";
}

function removeDiceRollTransition() {
  DICE_IMG.style.transition = DICE_IMG.style.transform = "";
}

function setDiceFace(diceFace) {
  if (DICE_IMG.classList.contains("hidden")) {
    DICE_IMG.src = DICE_IMG_PATH.replace("*", diceFace);
    showDice();
  } else {
    addDiceRollTransition();

    setTimeout(() => {
      DICE_IMG.src = DICE_IMG_PATH.replace("*", diceFace);
      removeDiceRollTransition();
      console.log(`Dice Face is: ${diceFace}`);
    }, DICE_ROLL_DURATION_SECONDS * 1000);
  }
}

function rollDice() {
  const diceFace = Math.trunc(Math.random() * 6) + 1;

  setDiceFace(diceFace);

  if (diceFace === 1) {
    toggleActivePlayer();
  } else {
    setActivePlayerCurrentScore(ACTIVE_PLAYER_CURRENT_SCORE + diceFace);
  }
}

function hold() {
  setActivePlayerTotalScore(
    getActivePlayerTotalScore() + ACTIVE_PLAYER_CURRENT_SCORE
  );
  toggleActivePlayer();
}

function initScores() {
  initTotalScores();
  initCurrentScores();
}

function initTotalScores() {
  setPlayerTotalScore(PLAYER.PLAYER_1, 0);
  setPlayerTotalScore(PLAYER.PLAYER_2, 0);
}

function initCurrentScores() {
  ACTIVE_PLAYER_CURRENT_SCORE = 0;

  setPlayerCurrentScore(PLAYER.PLAYER_1, 0);
  setPlayerCurrentScore(PLAYER.PLAYER_2, 0);
}

function startGame() {
  initScores();
  hideDice();
  setActivePlayer(PLAYER.PLAYER_1);
}

document
  .querySelector('[data-testid="new-game-btn"]')
  .addEventListener("click", startGame);
document
  .querySelector('[data-testid="roll-dice-btn"]')
  .addEventListener("click", rollDice);
document
  .querySelector('[data-testid="hold-btn"]')
  .addEventListener("click", hold);

startGame();
