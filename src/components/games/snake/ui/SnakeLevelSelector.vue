<script setup lang="ts">
import SnakeLevelTile from "./SnakeLevelTile.vue";
import SnakeSkinItem from "./SnakeSkinItem.vue";
import {ref} from "vue";
import {GetSnakeStorage} from "../engine/SnakeStorage.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const selectedSkin = ref<string>(GetSnakeStorage().snakeSkins[0]);
const selectedLevel = ref<string>("");

function onOpenInfo(level: string): void {
  selectedLevel.value = level;
}
function onCloseInfo(): void {
  selectedLevel.value = "";
}
function checkLocked(level: string): boolean {
  return !["1-1", "1-2"].includes(level);
}
</script>

<template>
<div>
  <div class="skin-container">
    <div class="selected-skin">
      <h2>Selected skin:</h2>
      <SnakeSkinItem selected-snake="" :type="selectedSkin" :on-select="() => router.push('/snake-skin')"/>
    </div>
  </div>
  <div class="worlds-container">
    <h1>Select a level</h1>
    <div class="world-container" v-for="(worldDifficulty, worldIndex) in ['Easy', 'Medium', 'Hard', 'Expert']">
      <h2>World {{worldIndex+1}} - {{worldDifficulty}}</h2>
      <div>
        <SnakeLevelTile
            v-for="levelIndex in 5"
            :level="`${worldIndex+1}-${levelIndex}`"
            :locked="checkLocked(`${worldIndex+1}-${levelIndex}`)"
            :opened-info="selectedLevel===`${worldIndex+1}-${levelIndex}`"
            :on-open-info="onOpenInfo"
            :on-close-info="onCloseInfo"/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.selected-skin {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem;
  background-color: var(--difficulty-1);
}
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