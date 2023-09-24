<script setup lang="ts">
defineProps<{ players: number }>()
</script>

<template>
  <div class="controls">
    <div class="player-controls">
      <div class="control-set">
        <h2>Player 1</h2>
        <div class="key"><span>W</span></div>
        <div>
          <div class="key"><span>A</span></div>
          <div class="key"><span>S</span></div>
          <div class="key"><span>D</span></div>
        </div>
      </div>
      <div class="control-set" v-if="players >= 2">
        <h2>Player 2</h2>
        <div class="key"><span>🡅</span></div>
        <div>
          <div class="key"><span>🡄</span></div>
          <div class="key"><span>🡇</span></div>
          <div class="key"><span>🡆</span></div>
        </div>
      </div>
    </div>
    <div class="other-controls">
      <div class="defined-key">
        <p>Start new game</p>
        <div class="key large-key"><span>ENTER</span></div>
      </div>
      <div class="defined-key">
        <p>Pause game</p>
        <div class="key large-key"><span>ESC</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}
.player-controls {
  display: flex;
  gap: 5rem;
  justify-content: center;
}
.other-controls {
  display: flex;
  flex-direction: column;
  width: min-content;
  gap: 0.5rem;
}
.defined-key {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.defined-key>p {
  white-space: nowrap;
}
.control-set {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.control-set>div:last-child {
  display: flex;
}
.key {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444;
  border-radius: 0.7rem;
  width: 3rem;
  height: 3rem;
  font-size: 24px;
  font-weight: 700;
  margin: 0.1rem;
}
.large-key {
  padding: 0 1rem;
  font-size: 20px;
  font-weight: 600;
  width: unset;
}
</style>