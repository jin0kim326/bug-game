const startBtn = document.querySelector(".start-btn");
const timer = document.querySelector(".timer");
const field = document.querySelector(".field");
const counter = document.querySelector(".counter");

/* 
타이머 만들기

1. 10초 제한시간 두기
2. 1초마다 출력하기

*/

startBtn.addEventListener("click", () => {
  startTimer();
  onAddImages();
  onCounter();
});

function onCounter(decreaseCount) {
  const setCount = 10;
  counter.innerHTML = setCount;
}

function startTimer() {
  let timeleft = 10;
  const countTime = setInterval(() => {
    timer.innerHTML = `0:${timeleft}`;
    timeleft -= 1;
    if (timeleft < 0) {
      //gameover
      console.log("timeout");
      clearInterval(countTime);
    }
  }, 500);
}

function createImage(type) {
  const fieldRect = field.getBoundingClientRect();
  const maxX = fieldRect.width - 92;
  const maxY = fieldRect.height - 86;

  const item = document.createElement("li");
  item.setAttribute("class", "item");
  item.addEventListener("click", (event) => {
    const target = event.target;
    const type = target.dataset.type;

    if (type == "bug") {
      //gameover
      console.log("gameover");
      return;
    }

    if (type == "carrot") {
      field.removeChild(item);
      decreaseCounter();
    }
  });

  function decreaseCounter() {
    let count = document.querySelector(".counter").innerHTML;
    count -= 1;
    counter.innerHTML = count;
  }

  const btn = document.createElement("button");
  btn.setAttribute("class", type);
  // btn.style.transform = `translate(${maxX * Math.random()}px, ${
  //   maxY * Math.random()
  // }px)`;

  // item.style.top = `"${maxX * Math.random()}px"`;
  // item.style.left = `"${maxY * Math.random()}px"`;
  item.style.top = `${maxY * Math.random()}px`;
  item.style.left = `${maxX * Math.random()}px`;

  btn.innerHTML = `<img src="img/${type}.png" alt="${type}" data-type="${type}"/>`;

  item.appendChild(btn);
  return item;
}

function createImages() {
  const carrot = createImage("carrot");
  field.appendChild(carrot);

  const bug = createImage("bug");
  field.appendChild(bug);
}

function onAddImages() {
  let n = 0;
  while (n < 10) {
    createImages();
    n++;
  }
}
