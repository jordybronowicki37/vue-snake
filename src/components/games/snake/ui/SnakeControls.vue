<script setup lang="ts">
defineProps<{ players: number }>()
</script>

<template>
  <div class="controls">
    <div class="control-set">
      <h2>Player 1</h2>
      <div class="key"><span>W</span></div>
      <div>
        <div class="key"><span>A</span></div>
        <div class="key"><span>S</span></div>
        <div class="key"><span>D</span></div>
      </div>
    </div>
    <div class="control-set">
      <h2>Player 2</h2>
      <div class="key"><span>🡅</span></div>
      <div>
        <div class="key"><span>🡄</span></div>
        <div class="key"><span>🡇</span></div>
        <div class="key"><span>🡆</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  user-select: none;
  display: flex;
  gap: 5rem;
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
</style>