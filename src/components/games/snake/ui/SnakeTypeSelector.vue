<script setup lang="ts">
import SnakeTypeItem from "./SnakeTypeItem.vue";
import {GetSnakeStorage, SaveSnakeStorage} from "../engine/SnakeStorage";
import {ref} from "vue";

const selectedSnake = ref<string>(GetSnakeStorage().snakeStyles[0]);

const selectSnake = (type: string): void => {
  const storage = GetSnakeStorage();
  storage.snakeStyles[0] = type;
  selectedSnake.value = type;
  SaveSnakeStorage(storage);
}
</script>

<template>
  <div class="snake-type-selector">
    <div class="top">
      <h1>Select a snake style</h1>
      <div class="current-selected-container">
        <h2>Current: </h2>
        <transition name="fade" mode="out-in">
          <SnakeTypeItem :key="selectedSnake" v-bind:type="selectedSnake" v-bind:can-select="false" v-bind:on-select="()=>{}" selected-snake=""/>
        </transition>
      </div>
    </div>

    <div class="snake-types">
      <SnakeTypeItem v-bind:on-select="selectSnake" type="Green" v-bind:selected-snake="selectedSnake"/>
      <SnakeTypeItem v-bind:on-select="selectSnake" type="Blue" v-bind:selected-snake="selectedSnake"/>
    </div>
  </div>
</template>

<style scoped>
.snake-type-selector {
  padding: 4rem 8rem;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-selected-container {
  display: flex;
  gap: 2rem;
  background-color: cornflowerblue;
  padding: 1rem;
}

.snake-types {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  flex-wrap: wrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 20%;
}
</style>