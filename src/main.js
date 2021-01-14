"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";
import Game from "./game.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const game = new Game(10, 10, 10);
game.setGameStopListener((reason) => {
  let message;

  switch (reason) {
    case "cancel":
      message = "Replay ?";
      break;
    case "win":
      message = "YOU WON!!";
      break;
    case "lose":
      message = "YOU LOST..T_T";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});
