const startBtn = document.querySelector(".start-btn");
const timer = document.querySelector(".timer");

/* 
타이머 만들기

1. 10초 제한시간 두기
2. 1초마다 출력하기

*/

startBtn.addEventListener("click", () => {
  startTimer();
  onAddImages();
});

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
  const field = document.querySelector(".field");
  const fieldRect = field.getBoundingClientRect();
  const maxX = fieldRect.width - 92;
  const maxY = fieldRect.height - 86;

  const item = document.createElement("li");
  item.setAttribute("class", "item");

  const btn = document.createElement("button");
  btn.setAttribute("class", type);
  // btn.style.transform = `translate(${maxX * Math.random()}px, ${
  //   maxY * Math.random()
  // }px)`;

  // item.style.top = `"${maxX * Math.random()}px"`;
  // item.style.left = `"${maxY * Math.random()}px"`;
  item.style.top = `${maxY * Math.random()}px`;
  item.style.left = `${maxX * Math.random()}px`;

  btn.innerHTML = `<img src="img/${type}.png" alt="carrot" />`;

  item.appendChild(btn);
  return item;
}

function createImages() {
  const field = document.querySelector(".field");
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
