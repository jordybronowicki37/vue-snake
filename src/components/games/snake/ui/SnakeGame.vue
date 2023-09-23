<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import SnakeGameOver from "./SnakeGameOver.vue";
import {SnakeEngine} from "../engine/SnakeEngine.ts";
import {useRoute} from "vue-router";
import SnakePause from "./SnakePause.vue";
import SnakeScore from "./SnakeScore.vue";
import SnakeControls from "./SnakeControls.vue";

const route = useRoute();
const engine = ref<SnakeEngine>(new SnakeEngine(<string>route.params.level));
const showControls = ref<boolean>(true);

setTimeout(() => {
  showControls.value = false;
  engine.value.StartEngine();
}, 1000);
</script>

<template>
  <div class="snake-game-container">
    <transition name="overlay" mode="out-in">
      <div class="overlay" :key="showControls+''" v-if="showControls">
        <SnakeControls :players="2"/>
      </div>
    </transition>

    <transition name="overlay" mode="out-in">
      <div class="overlay" :key="engine.gamePaused+''" v-if="engine.gamePaused">
        <SnakePause/>
      </div>
    </transition>

    <transition name="overlay" mode="out-in">
      <div class="overlay" :key="engine.gameData.gameOver+''" v-if="engine.gameData.gameOver">
        <SnakeGameOver :game-data="engine.gameData"/>
      </div>
    </transition>

    <div class="grid-wrapper">
      <SnakeScore :game-data="engine.gameData"/>
      <Grid
          :data="engine.gameData.grid"
          :cellStyles="engine.gameData.assetStyles"
          :height="engine.gameData.options.gridHeight"
          :width="engine.gameData.options.gridWidth"/>
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
.overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  color: #ffff;
  background-color: #2226;
  backdrop-filter: blur(0.2rem);
}
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.8s;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>