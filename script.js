"use strict";

// Game States
let PLAYER_1_TOTAL_SCORE;
let PLAYER_2_TOTAL_SCORE;
let ACTIVE_PLAYER_CURRENT_SCORE;
let ACTIVE_PLAYER;

const PLAYER = {
  PLAYER_1: 1,
  PLAYER_2: 2,
};

// Game Configurations
const GAME_WIN_MESSAGE = "WON";
const GAME_LOST_MESSAGE = "LOST";

const DICE_IMG_PATH = "./assets/dice-*.png";
const DICE_ROLL_DURATION_SECONDS = 0.25;

// Player DOM
const PLAYER_1_EL = document.querySelector(".player-1");
const PLAYER_2_EL = document.querySelector(".player-2");

// Player Total Scores DOM
const PLAYER_1_TOTAL_SCORE_EL = document.querySelector(
  ".player-1 .player-total-score"
);
const PLAYER_2_TOTAL_SCORE_EL = document.querySelector(
  ".player-2 .player-total-score"
);

// Player Current Scores DOM
const PLAYER_1_CURRENT_SCORE_EL = document.querySelector(
  ".player-1 .current-score-container .current-score"
);
const PLAYER_2_CURRENT_SCORE_EL = document.querySelector(
  ".player-2 .current-score-container .current-score"
);

// Player Status DOM
const PLAYER_1_STATUS_EL = document.querySelector(".player-1 .player-status");
const PLAYER_2_STATUS_EL = document.querySelector(".player-2 .player-status");

// Dice DOM
const DICE_IMG = document.querySelector(".dice-image");

// Buttons DOM
const NEW_GAME_BTN = document.getElementById("new-game-btn");
const ROLL_DICE_BTN = document.getElementById("roll-dice-btn");
const HOLD_BTN = document.getElementById("hold-btn");

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

function setGameCompletedStatus() {
  if (ACTIVE_PLAYER === PLAYER.PLAYER_1) {
    PLAYER_1_STATUS_EL.textContent = GAME_WIN_MESSAGE;
    PLAYER_2_STATUS_EL.textContent = GAME_LOST_MESSAGE;
  } else if (ACTIVE_PLAYER === PLAYER.PLAYER_2) {
    PLAYER_2_STATUS_EL.textContent = GAME_WIN_MESSAGE;
    PLAYER_1_STATUS_EL.textContent = GAME_LOST_MESSAGE;
  } else {
    console.error(
      "Trying to set game completed status of invalid active player."
    );
  }
}

function setActivePlayerWindow() {
  PLAYER_1_EL.classList.remove("player-winner");
  PLAYER_2_EL.classList.remove("player-winner");

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

function setActivePlayerAsWinner() {
  if (ACTIVE_PLAYER === PLAYER.PLAYER_1) {
    PLAYER_1_EL.classList.remove("player-active");
    PLAYER_1_EL.classList.add("player-winner");

    console.log("Setting player 1 as winner");
  } else if (ACTIVE_PLAYER === PLAYER.PLAYER_2) {
    PLAYER_2_EL.classList.remove("player-active");
    PLAYER_2_EL.classList.add("player-winner");

    console.log("Setting player 2 as winner");
  } else {
    console.error("Trying to set invalid active player as winner.");
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

function setGameCompleted() {
  hideDice();
  removeGameControls();
  setGameCompletedStatus();
  setActivePlayerAsWinner();

  console.log("Game is completed");
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
  const highScore = getActivePlayerTotalScore() + ACTIVE_PLAYER_CURRENT_SCORE;
  setActivePlayerTotalScore(highScore);

  if (highScore >= 100) {
    setGameCompleted();
  } else {
    toggleActivePlayer();
  }
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

function initGameStatus() {
  PLAYER_1_STATUS_EL.textContent = "";
  PLAYER_2_STATUS_EL.textContent = "";
}

function initGameControls() {
  ROLL_DICE_BTN.classList.remove("hidden");
  HOLD_BTN.classList.remove("hidden");
}

function removeGameControls() {
  ROLL_DICE_BTN.classList.add("hidden");
  HOLD_BTN.classList.add("hidden");
}

function startGame() {
  initScores();
  initGameStatus();
  initGameControls();
  hideDice();
  setActivePlayer(PLAYER.PLAYER_1);
}

NEW_GAME_BTN.addEventListener("click", startGame);
ROLL_DICE_BTN.addEventListener("click", rollDice);
HOLD_BTN.addEventListener("click", hold);

startGame();
