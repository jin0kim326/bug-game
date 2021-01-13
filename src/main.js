"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score = 0;
let timer = undefined;

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);
// field.addEventListener("click", onFieldClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    // 당근클릭
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    sound.playBug();
    finishGame(false);
  }
}

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

function startGame() {
  started = true;
  sound.playBackground();
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  sound.stopBackground();
  sound.playAlert();
  stopGameTimer();
  hideGameButton();

  gameFinishBanner.showWithText("REPLAY ?");
}

function finishGame(win) {
  started = false;
  sound.stopBackground();
  stopGameTimer();
  hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  gameFinishBanner.showWithText(win ? "You Win!!" : "You Lost...T_T");
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  //벌레,당근 생성 후 field에 추가
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}
