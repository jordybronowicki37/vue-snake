<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<template>
<div>
  <div class="worlds-container">
    <h1>Select a level</h1>
    <div class="world-container world-1">
      <h2>World 1 - Easy</h2>
      <div>
        <button type="button" v-on:click="router.push('/game/1-1')">1-1</button>
        <button type="button" v-on:click="router.push('/game/1-2')">1-2</button>
        <button type="button" v-on:click="router.push('/game/1-3')">1-3</button>
        <button type="button" v-on:click="router.push('/game/1-4')">1-4</button>
        <button type="button" v-on:click="router.push('/game/1-5')">1-5</button>
      </div>
    </div>
    <div class="world-container world-2">
      <h2>World 2 - Medium</h2>
      <div>
        <button type="button" v-on:click="router.push('/game/2-1')">2-1</button>
        <button type="button" v-on:click="router.push('/game/2-2')">2-2</button>
        <button type="button" v-on:click="router.push('/game/2-3')">2-3</button>
        <button type="button" v-on:click="router.push('/game/2-4')">2-4</button>
        <button type="button" v-on:click="router.push('/game/2-5')">2-5</button>
      </div>
    </div>
    <div class="world-container world-3">
      <h2>World 3 - Hard</h2>
      <div>
        <button type="button" v-on:click="router.push('/game/3-1')">3-1</button>
        <button type="button" v-on:click="router.push('/game/3-2')">3-2</button>
        <button type="button" v-on:click="router.push('/game/3-3')">3-3</button>
        <button type="button" v-on:click="router.push('/game/3-4')">3-4</button>
        <button type="button" v-on:click="router.push('/game/3-5')">3-5</button>
      </div>
    </div>
    <div class="world-container world-4">
      <h2>World 4 - Expert</h2>
      <div>
        <button type="button" v-on:click="router.push('/game/4-1')">4-1</button>
        <button type="button" v-on:click="router.push('/game/4-2')">4-2</button>
        <button type="button" v-on:click="router.push('/game/4-3')">4-3</button>
        <button type="button" v-on:click="router.push('/game/4-4')">4-4</button>
        <button type="button" v-on:click="router.push('/game/4-5')">4-5</button>
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

.world-container button {
  font-size: 24px;
  font-weight: bolder;
  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}
.world-1 button {
  background-color: cornflowerblue;
}
.world-2 button {
  background-color: #64a10c;
}
.world-3 button {
  background-color: orange;
}
.world-4 button {
  background-color: red;
}
</style>