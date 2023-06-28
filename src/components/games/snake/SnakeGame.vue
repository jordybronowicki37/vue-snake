<script setup lang="ts">
import Grid from "../../grid/Grid.vue";
import {ref} from "vue";
import {SnakeGameData} from "./SnakeGameTypes.ts";
import {ChangeDirection, MoveForward, SetupGame, SnakeGameCellStyles, GridHeight, GridWidth} from "./SnakeGameLogic.ts";
import SnakeGameOver from "./SnakeGameOver.vue";

const snakeGameData = ref<SnakeGameData>(SetupGame());
const timerId = ref<number>(0);
const score = ref<number>(snakeGameData.value.score);
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
  if (score.value !== snakeGameData.value.score) {
    score.value = snakeGameData.value.score;
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
  snakeGameData.value = SetupGame();
  score.value = 0;
  SetupTimer();
}
</script>

<template>
  <div tabindex="0" autofocus class="snake-game-container"
       @keydown.enter="StartNewGame()"
      @keydown.space="MoveForward(snakeGameData)"
      @keydown.up="ChangeDirection(snakeGameData, 'UP')"
      @keydown.left="ChangeDirection(snakeGameData, 'LEFT')"
      @keydown.down="ChangeDirection(snakeGameData, 'DOWN')"
      @keydown.right="ChangeDirection(snakeGameData, 'RIGHT')">
    <SnakeGameOver v-bind:show="snakeGameData.gameOver" v-bind:message="gameOverMessage" v-bind:score="score"/>
    <div class="grid-wrapper">
      <div class="score-value">High score: {{highScore}}</div>
      <div class="score-value">Current score: {{score}}</div>
      <Grid v-bind:data="snakeGameData.grid" v-bind:cellStyles="SnakeGameCellStyles" v-bind:height="GridHeight" v-bind:width="GridWidth"/>
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