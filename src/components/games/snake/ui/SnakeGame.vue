<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import SnakeGameOver from "./SnakeGameOver.vue";
import {SnakeGameCellStyles} from "../engine/SnakeStyling";
import {SnakeEngine} from "../engine/SnakeEngine.ts";
import {useRoute} from "vue-router";
import SnakePause from "./SnakePause.vue";
import {GenerateLevel} from "../levels/SnakeLevelServer.ts";

const route = useRoute();
const level = GenerateLevel(<string>route.params.level);
const snakeEngine = ref<SnakeEngine>(new SnakeEngine(level));
snakeEngine.value.StartEngine();
</script>

<template>
  <div class="snake-game-container">
    <SnakePause v-bind:show="snakeEngine.gamePaused"/>
    <SnakeGameOver v-bind:game-data="snakeEngine.snakeGameData"/>
    <div class="grid-wrapper">
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
.grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>