"use strict";

const bgSound = new Audio("/sound/bg.mp3");
bgSound.crossOrigin = "anonymous";
const carrotSound = new Audio("/sound/carrot_pull.mp3");
carrotSound.crossOrigin = "ananonymous";
const bugSound = new Audio("/sound/bug_pull.mp3");
bugSound.crossOrigin = "anonymous";
const winSound = new Audio("/sound/game_win.mp3");
winSound.crossOrigin = "anonymous";
const alertSound = new Audio("/sound/alert.wav");
alertSound.crossOrigin = "anonymous";

export function playBackground() {
  soundPlay(bgSound);
}

export function playCarrot() {
  soundPlay(carrotSound);
}

export function playBug() {
  soundPlay(bugSound);
}

export function playWin() {
  soundPlay(winSound);
}

export function playAlert() {
  soundPlay(alertSound);
}

export function stopBackground() {
  soundStop(bgSound);
}

function soundPlay(sound) {
  sound.currentTime = 0;

  // Show loading animation.
  const playPromise = sound.play();

  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        sound.play();
      })
      .catch((error) => {
        // Auto-play was prevented
        // Show paused UI.
      });
  }
}

function soundStop(sound) {
  sound.pause();
}
