<script setup lang="ts">
  import {SnakeGameData} from "../engine/SnakeTypes.ts";
  import {ref} from "vue";

  defineProps<{ gameData: SnakeGameData }>();

  const message = ref<string>("");
  
  function GenerateNewMessage(score: number): string {
    if (score < 5) {
      return "You're a joke!";
    } else if (score < 10) {
      return "Good job! Loser";
    } else if (score < 15) {
      return "You're getting better!";
    } else if (score < 20) {
      return "Good job!";
    } else if (score < 25) {
      return "Great job!";
    } else {
      return "Well done Master!";
    }
  }
</script>

<template>
  <div v-if="gameData.gameOver" class="game-over-screen">
    <div v-if="gameData.players.length === 1">
      <h3 class="game-over-text">
        Game-over
      </h3>
      <div class="game-over-score">
        <div class="new-highscore-message">NEW HIGHSCORE!</div>
        <div>score: {{gameData.players[0].score}}</div>
      </div>
      <div class="game-over-start-new">
        Press ENTER to start a new game
      </div>
      <div class="tip-container">
        <div class="tip-pre">Tip:</div>
        <div class="tip-message">Try not to suck so much!</div>
      </div>
    </div>

    <div v-if="gameData.players.length > 1">
      <h3 class="game-over-text">Player {{gameData.players.findIndex(p => !p.gameOver)+1}} has won!</h3>
      <div class="game-over-start-new">
        Press ENTER to start a new game
      </div>
      <div class="tip-container">
        <div class="tip-pre">Tip:</div>
        <div class="tip-message">Try to do better!</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-over-screen {
  user-select: none;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #2226;
  color: #ffff;
  backdrop-filter: blur(0.2rem);
  animation: showGameOver 1s;
}

.game-over-screen>div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

@keyframes showGameOver {
  from {
    color: #fff0;
    background-color: #2220;
    backdrop-filter: blur(0);
  }
  to {
    color: #ffff;
    background-color: #2226;
    backdrop-filter: blur(0.2rem);
  }
}

.game-over-text {
  font-family: "Agency FB", fantasy;
  font-size: 3rem;
  margin: 0;
}

.game-over-score {
  font-family: monospace;
  font-size: 1rem;
  text-align: center;
}

.new-highscore-message {
  height: 20px;
  font-style: italic;
  color: lightseagreen;
  animation: newHighscore infinite 1.5s;
}

@keyframes newHighscore {
  from, to { font-size: 16px; }
  50% { font-size: 18px; }
}

.game-over-start-new {
  font-family: monospace;
}

.tip-container {
  background-color: #2a2a2a;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  max-width: 20rem;
}
.tip-pre {
  font-weight: 700;
  font-size: 20px;
  color: lightseagreen;
}
.tip-message {
  font-size: 16px;
  align-self: center;
}
</style>