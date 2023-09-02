<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import {SnakeGameData} from "../engine/SnakeTypes";
import {ChangeDirection, MoveForward} from "../engine/SnakeLogic";
import SnakeGameOver from "./SnakeGameOver.vue";
import {SnakeGameCellStyles} from "../engine/SnakeStyling";
import {SetupSnakeLevel1} from "../levels/SnakeLevel1";

const snakeGameData = ref<SnakeGameData>(SetupSnakeLevel1());
const timerId = ref<number>(0);
const score = ref<number>(0);
const highScore = ref<number>(Number(localStorage.getItem("snakeHighScore")));
const gameOverMessage = ref<string>("");

function SetupTimer() {
  clearInterval(timerId.value);
  timerId.value = setInterval(NextTimeStep, 350 * Math.pow(0.98, score.value));
}
SetupTimer();

function NextTimeStep() {
  MoveForward(snakeGameData.value)
  if (snakeGameData.value.gameOver) {
    GenerateNewMessage()
    clearInterval(timerId.value);
  }
  const totalScore = snakeGameData.value.players.map(v => v.score).reduce((a, b) => a + b, 0);
  if (score.value !== totalScore) {
    score.value = totalScore;
    if (score.value > highScore.value) {
      localStorage.setItem("snakeHighScore", String(score.value));
      highScore.value = score.value;
    }
    clearInterval(timerId.value);
    SetupTimer();
  }
}

function GenerateNewMessage() {
  if (score.value < 5) {
    gameOverMessage.value = "You're a joke!";
  } else if (score.value < 10) {
    gameOverMessage.value = "Good job! Loser";
  } else if (score.value < 15) {
    gameOverMessage.value = "You're getting better!";
  } else if (score.value < 20) {
    gameOverMessage.value = "Good job!";
  } else if (score.value < 25) {
    gameOverMessage.value = "Great job!";
  } else {
    gameOverMessage.value = "Well done Master!";
  }
}

function StartNewGame() {
  clearInterval(timerId.value);
  snakeGameData.value = SetupSnakeLevel1();
  score.value = 0;
  SetupTimer();
}

document.addEventListener("keydown", HandleButtonClick);

function HandleButtonClick(e: KeyboardEvent) {
  console.log("Button down")
  switch (e.key) {
    case "Enter":
      StartNewGame();
      break;
    case "w":
      ChangeDirection(snakeGameData.value, 'UP', 0)
      break;
    case "a":
      ChangeDirection(snakeGameData.value, 'LEFT', 0)
      break;
    case "s":
      ChangeDirection(snakeGameData.value, 'DOWN', 0)
      break;
    case "d":
      ChangeDirection(snakeGameData.value, 'RIGHT', 0)
      break;
  }
  if (snakeGameData.value.players.length === 1) return;
  switch (e.key) {
    case "ArrowUp":
      ChangeDirection(snakeGameData.value, 'UP', 1)
      break;
    case "ArrowLeft":
      ChangeDirection(snakeGameData.value, 'LEFT', 1)
      break;
    case "ArrowDown":
      ChangeDirection(snakeGameData.value, 'DOWN', 1)
      break;
    case "ArrowRight":
      ChangeDirection(snakeGameData.value, 'RIGHT', 1)
      break;
  }
}
</script>

<template>
  <div class="snake-game-container">
    <SnakeGameOver v-bind:show="snakeGameData.gameOver" v-bind:message="gameOverMessage" v-bind:score="score"/>
    <div class="grid-wrapper">
      <div class="score-value">High score: {{highScore}}</div>
      <div class="score-value">Current score: {{score}}</div>
      <Grid
          v-bind:data="snakeGameData.grid"
          v-bind:cellStyles="SnakeGameCellStyles()"
          v-bind:height="snakeGameData.options.gridHeight"
          v-bind:width="snakeGameData.options.gridWidth"/>
    </div>
  </div>
</template>

<style scoped>
.snake-game-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
}
.score-value {
  text-align: right;
  font-size: 20px;
  font-weight: bold;
}
.grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>