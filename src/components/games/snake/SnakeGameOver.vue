<script setup lang="ts">
  defineProps<{ show: boolean, score: number, message: string;}>()
</script>

<template>
  <div v-if="show" class="game-over-screen">
    <div class="game-over-text">
      Game-over
    </div>
    <div class="game-over-score">
      score: {{score}}
    </div>
    <div>
      <div class="game-over-message">
        {{message}}
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