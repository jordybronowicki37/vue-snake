<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import SnakeGameOver from "./SnakeGameOver.vue";
import {SnakeGameCellStyles} from "../engine/SnakeStyling";
import {SnakeEngine} from "../engine/SnakeEngine.ts";
import {useRoute} from "vue-router";
import SnakePause from "./SnakePause.vue";
import SnakeScore from "./SnakeScore.vue";

const route = useRoute();
const engine = ref<SnakeEngine>(new SnakeEngine(<string>route.params.level));
engine.value.StartEngine();
</script>

<template>
  <div class="snake-game-container">
    <SnakePause v-bind:show="engine.gamePaused"/>
    <SnakeGameOver v-bind:game-data="engine.gameData"/>
    <div class="grid-wrapper">
      <SnakeScore v-bind:game-data="engine.gameData"/>
      <Grid
          v-bind:data="engine.gameData.grid"
          v-bind:cellStyles="SnakeGameCellStyles()"
          v-bind:height="engine.gameData.options.gridHeight"
          v-bind:width="engine.gameData.options.gridWidth"/>
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