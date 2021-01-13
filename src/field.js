"use strict";
import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      sound.playBug();
      this.onItemClick && this.onItemClick("bug");
    }
  };

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }

  _addItem(className, count, imgPath) {
    const maxX = this.fieldRect.width - CARROT_SIZE;
    const maxY = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";

      item.style.left = `${maxX * Math.random()}px`;
      item.style.top = `${maxY * Math.random() - 40}px`;
      this.field.appendChild(item);
    }
  }
}
