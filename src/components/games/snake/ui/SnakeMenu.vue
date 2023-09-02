<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
<div class="snake-menu">
  <h1>Select a game-mode</h1>
  <div class="game-mode-cards">
    <div class="mode-card single-player-card">
      <h2>Single-player</h2>
      <p>Navigate a maze, eat to grow, and avoid obstacles in a quest for the highest score.
        Test your skills in this classic solo adventure.</p>
      <button v-on:click="router.push('/levels')">Play ⮞</button>
    </div>
    <div class="mode-card battle-card">
      <h2>Battle</h2>
      <p>Face off against your friends in a fast-paced, last-snake-standing battle. Use
        cunning moves to emerge as the victor in this intense multiplayer showdown.</p>
      <button>Play ⮞</button>
    </div>
    <div class="mode-card ">
      <h2>Versus</h2>
      <p>Compete in separate boards to collect fruits and outlast your opponent in this head-to-head
        challenge. Coordinate your strategy and prove your snake supremacy in this multiplayer rivalry.</p>
      <button>Play ⮞</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.snake-menu>h1 {
  margin: 0;
  padding: 10rem 0 4rem 0;
  text-align: center;
  font-size: 50px;
}

.game-mode-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.mode-card {
  padding: 0.5rem;
  width: 20rem;
  text-align: center;
  border-radius: 2rem;
  border: none;
  background-color: #333;
  display: flex;
  flex-direction: column;
}
.mode-card>h2 {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 0.5rem 0;
  cursor: default;
}
.mode-card>p {
  flex-grow: 2;
  margin: 0.2rem 0.5rem;
  cursor: default;
}
.mode-card>button {
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  background-color: #555;
  align-self: end;
  margin: 0.5rem;

  &:hover {
    background-color: #666;
  }
}
</style>