const field = document.querySelector(".field");
const fieldRect = field.getBoundingClientRect();

const startBtn = document.querySelector(".start-btn");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
function initGame() {
  //벌레,당근 생성 후 field에 추가
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
    item.style.top = `${maxY * Math.random()}px`;
    item.style.left = `${maxX * Math.random()}px`;
    field.appendChild(item);
  }
}
initGame();

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
