<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import SnakeGameOver from "./SnakeGameOver.vue";
import {SnakeGameCellStyles} from "../engine/SnakeStyling";
import {SetupSnakeLevel1} from "../levels/SnakeLevel1";
import {SnakeEngine} from "../engine/SnakeEngine.ts";

const score = ref<number>(0);
const highScore = ref<number>(Number(localStorage.getItem("snakeHighScore")));
const gameOverMessage = ref<string>("");
const snakeEngine = ref<SnakeEngine>(new SnakeEngine(SetupSnakeLevel1()));
snakeEngine.value.StartEngine();
</script>

<template>
  <div class="snake-game-container">
    <SnakeGameOver v-bind:show="snakeEngine.snakeGameData.gameOver" v-bind:message="gameOverMessage" v-bind:score="score"/>
    <div class="grid-wrapper">
      <div class="score-value">High score: {{highScore}}</div>
      <div class="score-value">Current score: {{score}}</div>
      <Grid
          v-bind:data="snakeEngine.snakeGameData.grid"
          v-bind:cellStyles="SnakeGameCellStyles()"
          v-bind:height="snakeEngine.snakeGameData.options.gridHeight"
          v-bind:width="snakeEngine.snakeGameData.options.gridWidth"/>
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