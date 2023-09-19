<script setup lang="ts">
import {SnakeGameData} from "../engine/SnakeTypes";
const {gameData} = defineProps<{ gameData: SnakeGameData }>();
const difficultyClass = `difficulty-${gameData.options.level[0]}`;
</script>

<template>
<div class="game-score-container-wrapper">
  <div class="solo-game-score-container" v-if="gameData.players.length === 1">
    <div>
      <h3 class="level-line" :class="[difficultyClass]">
        <span>Level:</span>
        <span>{{gameData.options.level}}</span>
      </h3>
      <div class="score-line">
        <div>Highscore:</div>
        <div>{{gameData.players[0].score}}</div>
      </div>
      <div class="score-line">
        <div>Score:</div>
        <div>{{gameData.players[0].score}}</div>
      </div>
    </div>
  </div>
  <div class="multiplayer-game-score-container" v-if="gameData.players.length > 1">
    <div v-for="i in gameData.players.length" class="player-score-container">
      <h3 class="player-name" :class="[`difficulty-${i}`]">Player {{i}}</h3>
      <div class="score-line">
        <div>Score:</div>
        <div>{{gameData.players[i-1].score}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.game-score-container-wrapper {
  width: 100%;
}

.solo-game-score-container,
.multiplayer-game-score-container {
  display: flex;
  justify-content: center;
  gap: 10rem;
}

.level-line,
.score-line {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
}

.level-line * {
  color: var(--difficulty-color);
  font-size: 24px;
  font-weight: 700;
}

.player-name {
  color: var(--difficulty-color);
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}
</style>