<script setup lang="ts">
import {SnakeGameData} from "../engine/SnakeTypes";

defineProps<{ gameData: SnakeGameData }>();
</script>

<template>
<div class="game-score-container-wrapper">
  <div class="solo-game-score-container" v-if="gameData.players.length === 1">
    <div>
      <h3 class="level-line">
        <div v-bind:class="[`difficulty-${gameData.options.level[0]}`]">Level:</div>
        <div v-bind:class="[`difficulty-${gameData.options.level[0]}`]">{{gameData.options.level}}</div>
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
      <h3 class="player-name">Player {{i}}</h3>
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
  font-size: 24px;
  font-weight: 700;
}

.difficulty-1 {
  color: cornflowerblue;
}
.difficulty-2 {
  color: #64a10c;
}
.difficulty-3 {
  color: orange;
}
.difficulty-4 {
  color: red;
}

.player-name {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}
.player-score-container:nth-child(1)>h3 {
  color: cornflowerblue;
}
.player-score-container:nth-child(2)>h3 {
  color: #64a10c;
}
.player-score-container:nth-child(3)>h3 {
  color: orange;
}
.player-score-container:nth-child(4)>h3 {
  color: red;
}
</style>