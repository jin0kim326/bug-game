"use strict";
import PopUp from "./popup.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score = 0;
let timer = undefined;

const bgSound = new Audio("/sound/bg.mp3");
const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const winSound = new Audio("/sound/game_win.mp3");
const alertSound = new Audio("/sound/alert.wav");

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

function startGame() {
  started = true;
  soundPlay(bgSound);
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  soundStop(bgSound);
  soundPlay(alertSound);
  stopGameTimer();
  hideGameButton();

  gameFinishBanner.showWithText("REPLAY ?");
  // showPopUpWithText("REPLAY ?");
}

function finishGame(win) {
  started = false;
  soundStop(bgSound);
  stopGameTimer();
  hideGameButton();
  if (win) {
    soundPlay(winSound);
  } else {
    soundPlay(bugSound);
  }
  gameFinishBanner.showWithText(win ? "You Win!!" : "You Lost...T_T");
  // showPopUpWithText(win ? "You Win!!" : "You Lost...T_T");
}

field.addEventListener("click", onFieldClick);

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    // 당근클릭
    target.remove();
    score++;
    soundPlay(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    soundPlay(bugSound);
    finishGame(false);
  }
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
  field.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function addItem(className, count, imgPath) {
  const maxX = fieldRect.width - CARROT_SIZE;
  const maxY = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";

    // console.log(`${maxY}px, ${maxX}px`);
    // console.log(fieldRect.height);

    item.style.left = `${maxX * Math.random()}px`;
    item.style.top = `${maxY * Math.random() - 40}px`;
    field.appendChild(item);
  }
}

function soundPlay(sound) {
  sound.currentTime = 0;
  sound.play();
}

function soundStop(sound) {
  sound.pause();
}
