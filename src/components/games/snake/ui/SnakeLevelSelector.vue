<script setup lang="ts">
import SnakeLevelTile from "./SnakeLevelTile.vue";
</script>

<template>
<div>
  <div class="worlds-container">
    <h1>Select a level</h1>
    <div class="world-container world-1">
      <h2>World 1 - Easy</h2>
      <div>
        <SnakeLevelTile level="1-1"/>
        <SnakeLevelTile level="1-2"/>
        <SnakeLevelTile level="1-3"/>
        <SnakeLevelTile level="1-4"/>
        <SnakeLevelTile level="1-5"/>
      </div>
    </div>
    <div class="world-container world-2">
      <h2>World 2 - Medium</h2>
      <div>
        <SnakeLevelTile level="2-1"/>
        <SnakeLevelTile level="2-2"/>
        <SnakeLevelTile level="2-3"/>
        <SnakeLevelTile level="2-4"/>
        <SnakeLevelTile level="2-5"/>
      </div>
    </div>
    <div class="world-container world-3">
      <h2>World 3 - Hard</h2>
      <div>
        <SnakeLevelTile level="3-1"/>
        <SnakeLevelTile level="3-2"/>
        <SnakeLevelTile level="3-3"/>
        <SnakeLevelTile level="3-4"/>
        <SnakeLevelTile level="3-5"/>
      </div>
    </div>
    <div class="world-container world-4">
      <h2>World 4 - Expert</h2>
      <div>
        <SnakeLevelTile level="4-1"/>
        <SnakeLevelTile level="4-2"/>
        <SnakeLevelTile level="4-3"/>
        <SnakeLevelTile level="4-4"/>
        <SnakeLevelTile level="4-5"/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.worlds-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
.worlds-container>h1 {
  margin: 0;
  padding: 4rem 0 4rem 0;
  text-align: center;
  font-size: 50px;
}

.world-container>h2 {
  margin: 0;
  text-align: center;
}
.world-container>div {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>