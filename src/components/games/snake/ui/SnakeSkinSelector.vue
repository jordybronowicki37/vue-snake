<script setup lang="ts">
import SnakeSkinItem from "./SnakeSkinItem.vue";
import {GetSnakeStorage, SaveSnakeStorage} from "../engine/SnakeStorage";
import {ref} from "vue";

const selectedSkin = ref<string>(GetSnakeStorage().snakeSkins[0]);

const selectSkin = (skin: string): void => {
  const storage = GetSnakeStorage();
  storage.snakeSkins[0] = skin;
  selectedSkin.value = skin;
  SaveSnakeStorage(storage);
}
</script>

<template>
  <div class="snake-skin-selector">
    <div class="top">
      <h1>Select a snake skin</h1>
      <div class="current-selected-container">
        <h2>Current: </h2>
        <transition name="fade" mode="out-in">
          <SnakeSkinItem :key="selectedSkin" v-bind:type="selectedSkin" v-bind:can-select="false" v-bind:on-select="()=>{}" selected-snake=""/>
        </transition>
      </div>
    </div>

    <div class="snake-types">
      <SnakeSkinItem v-bind:on-select="selectSkin" type="Green" v-bind:selected-snake="selectedSkin"/>
      <SnakeSkinItem v-bind:on-select="selectSkin" type="Blue" v-bind:selected-snake="selectedSkin"/>
    </div>
  </div>
</template>

<style scoped>
.snake-skin-selector {
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