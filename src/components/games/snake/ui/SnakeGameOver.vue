<script setup lang="ts">
  import {SnakeGameData} from "../engine/SnakeTypes.ts";
  import {ref} from "vue";

  defineProps<{ gameData: SnakeGameData }>();

  const message = ref<string>("");
  
  function GenerateNewMessage(): string {
    const score = 0;
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
    <div class="game-over-text">
      Game-over
    </div>
    <div class="game-over-score">
      score: {{0}}
    </div>
    <div>
      <div class="game-over-message">
        {{GenerateNewMessage()}}
      </div>
    </div>
    <div class="game-over-start-new">
      Press ENTER to start a new game
    </div>
  </div>
</template>

<style scoped>


.game-over-screen {
  user-select: none;
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
  animation: showGameOver 1s;
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
}

.game-over-score {
  font-family: monospace;
  font-size: 1rem;
}

.game-over-message {
  --message-length: v-bind(message.length);
  font-family: monospace;
  overflow: hidden;
  border-right: .15em solid white;
  white-space: nowrap;
  margin: 1rem auto;
  animation:
      typing calc(.2s * var(--message-length)) steps(var(--message-length), end),
      blink-caret .75s step-end infinite;
}

@keyframes typing {
  0%, 20% { width: 0 }
  100% { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}

.game-over-start-new {
  margin-top: 4rem;
  font-family: monospace;
  animation: showStartNew 8s;
}

@keyframes showStartNew {
  0%, 75% {color: #fff0}
  100% {color: #ffff}
}
</style>