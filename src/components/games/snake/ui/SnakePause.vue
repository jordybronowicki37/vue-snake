<script setup lang="ts">
import SnakeControls from "./SnakeControls.vue";
</script>

<template>
    <div class="pause-screen">
      <h2>Game paused!</h2>
      <SnakeControls :players="2"/>
    </div>
</template>

<style scoped>
.pause-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}
</style>