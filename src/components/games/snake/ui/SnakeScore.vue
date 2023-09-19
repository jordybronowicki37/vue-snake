<script setup lang="ts">
import {SnakeGameData} from "../engine/SnakeTypes";
import {GetLevelData} from "../engine/SnakeStorage.ts";
const {gameData} = defineProps<{ gameData: SnakeGameData }>();
const {players, options} = gameData;
const difficultyClass = `difficulty-${options.level[0]}`;
const highScore = GetLevelData(options.level).highScore;
const currentScore = players[0].score;
</script>

<template>
<div class="game-score-container-wrapper">
  <div class="solo-game-score-container" v-if="players.length === 1">
    <div>
      <h3 class="level-line" :class="[difficultyClass]">
        <span>Level:</span>
        <span>{{options.level}}</span>
      </h3>
      <div class="score-line">
        <div>Highscore:</div>
        <div>{{highScore > players[0].score ? highScore:players[0].score }}</div>
      </div>
      <div class="score-line">
        <div>Score:</div>
        <div>{{players[0].score}}</div>
      </div>
    </div>
  </div>
  <div class="multiplayer-game-score-container" v-if="players.length > 1">
    <div v-for="i in players.length" class="player-score-container">
      <h3 class="player-name" :class="[`difficulty-${i}`]">Player {{i}}</h3>
      <div class="score-line">
        <div>Score:</div>
        <div>{{players[i-1].score}}</div>
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