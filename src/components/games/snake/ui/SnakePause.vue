<script setup lang="ts">
defineProps<{ show: boolean }>()
</script>

<template>
<div v-if="show" class="pause-screen">
  <h2>
    Game paused!
  </h2>
</div>
</template>

<style scoped>
.pause-screen {
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
  animation: showPause 1s;
}

@keyframes showPause {
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
</style>