<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import SnakeGameOver from "./SnakeGameOver.vue";
import {SnakeEngine} from "../engine/SnakeEngine.ts";
import {useRoute} from "vue-router";
import SnakePause from "./SnakePause.vue";
import SnakeScore from "./SnakeScore.vue";
import SnakeControls from "./SnakeControls.vue";
import SnakeLevelChallenges from "./SnakeLevelChallenges.vue";
import {GetLevelData} from "../engine/SnakeStorage.ts";
import {GetChallengesData} from "../levels/SnakeChallengesProvider.ts";

const route = useRoute();
const level = <string>route.params.level;
const engine = ref<SnakeEngine>(new SnakeEngine(level));
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
        <SnakeControls :players="engine.gameData.players.length"/>
      </div>
    </transition>

    <transition name="overlay" mode="out-in">
      <div class="overlay" :key="engine.gamePaused+''" v-if="engine.gamePaused">
        <SnakePause :players="engine.gameData.players.length"/>
      </div>
    </transition>

    <transition name="overlay" mode="out-in">
      <div class="overlay" :key="engine.gameData.gameOver+''" v-if="engine.gameData.gameOver">
        <SnakeGameOver :game-data="engine.gameData"/>
      </div>
    </transition>

    <div class="grid-wrapper">
      <div class="game-wrapper">
        <div class="top-bar">
          <div v-if="!['versus', 'battle'].includes(level)">
            <SnakeLevelChallenges :challenges="engine.gameData.challenges"/>
          </div>
          <SnakeScore :game-data="engine.gameData"/>
        </div>
        <Grid
            :data="engine.gameData.grid"
            :cellStyles="engine.gameData.assetStyles"
            :height="engine.gameData.options.gridHeight"
            :width="engine.gameData.options.gridWidth"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.snake-game-container {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
.game-wrapper {
  padding: 0.2rem;
  border-radius: 1rem 1rem 0 0;
  background-color: #333;
  overflow: hidden;
}
.top-bar {
  display: flex;
  align-content: center;
  padding: 0.5rem;
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