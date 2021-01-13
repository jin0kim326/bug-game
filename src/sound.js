"use strict";

const bgSound = new Audio("/sound/bg.mp3");
const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const winSound = new Audio("/sound/game_win.mp3");
const alertSound = new Audio("/sound/alert.wav");

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
  sound.play();
}

function soundStop(sound) {
  sound.pause();
}