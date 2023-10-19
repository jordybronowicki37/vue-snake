<script setup lang="ts">

</script>

<template>
  <div class="header">
    <h1>Snake Master</h1>
    <nav class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/menu">Game-Modes</router-link>
      <a href="https://github.com/jordybronowicki37/vue-snake" target="_blank">Github</a>
    </nav>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  background-color: #383838;
  padding: 1rem;
}
.header h1 {
  margin: 0;
  color: var(--difficulty-2);
  overflow: hidden;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}
.links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  gap: 1rem;
}
.links>* {
  font-weight: 700;
  font-size: 20px;
  color: #eee;
}
.links>*:hover {
  color: #999;
}
.links .router-link-active {
  color: var(--difficulty-2);
}
</style>