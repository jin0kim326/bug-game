"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

let started = false;
let score = 0;
let timer = undefined;

const bgSound = new Audio("/sound/bg.mp3");
const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const winSound = new Audio("/sound/game_win.mp3");
const alertSound = new Audio("/sound/alert.wav");

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
  showPopUpWithText("REPLAY ?");
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
  showPopUpWithText(win ? "You Win!!" : "You Lost...T_T");
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

popUpRefresh.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function showPopUpWithText(text) {
  popUp.classList.remove("pop-up--hide");
  popUpMessage.innerText = text;
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

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

// ----------------------------------------------
// startBtn.addEventListener("click", () => {
//   startTimer();
//   onAddImages();
//   onCounter();
//   // onBackgroundBGM();
// });

// function onBackgroundBGM() {
//   const bgBGM = document.querySelector(".bg-bgm");
//   bgBGM.play();
// }
// function onCounter(decreaseCount) {
//   const setCount = 10;
//   counter.innerHTML = setCount;
// }

// function startTimer() {
//   let timeleft = 10;
//   const countTime = setInterval(() => {
//     timer.innerHTML = `0:${timeleft}`;
//     timeleft -= 1;
//     if (timeleft < 0) {
//       gameover("lose");
//       console.log("timeout");
//       clearInterval(countTime);
//     }
//   }, 500);
// }

// function decreaseCounter() {
//   let count = document.querySelector(".counter").innerHTML;
//   count -= 1;
//   counter.innerHTML = count;
// }

// function createImage(type) {
//   const fieldRect = field.getBoundingClientRect();
//   const maxX = fieldRect.width - 92;
//   const maxY = fieldRect.height - 86;

//   const item = document.createElement("li");
//   item.setAttribute("class", "item");
//   item.addEventListener("click", (event) => {
//     const target = event.target;
//     const type = target.dataset.type;

//     if (type == "bug") {
//       gameover("lose");
//       return;
//     }

//     if (type == "carrot") {
//       field.removeChild(item);
//       decreaseCounter();
//     }
//   });

//   const btn = document.createElement("button");
//   btn.setAttribute("class", type);
//   item.style.top = `${maxY * Math.random()}px`;
//   item.style.left = `${maxX * Math.random()}px`;

//   btn.innerHTML = `<img src="img/${type}.png" alt="${type}" data-type="${type}"/>`;

//   item.appendChild(btn);
//   return item;
// }

// function createImages() {
//   const carrot = createImage("carrot");
//   field.appendChild(carrot);

//   const bug = createImage("bug");
//   field.appendChild(bug);
// }

// function onAddImages() {
//   let n = 0;
//   while (n < 10) {
//     createImages();
//     n++;
//   }
// }

// function gameover(score) {
//   const comment = document.querySelector(".gameover__comment");
//   const gameoverBoard = document.querySelector(".gameover");

//   if (score == "win") {
//     comment.innerHTML = `You Won !!`;
//     console.log("win");
//   } else if (score == "lose") {
//     comment.innerHTML = `You Lost..T_T`;
//     console.log("lose");
//   }
//   gameoverBoard.classList.add("active");
// }
