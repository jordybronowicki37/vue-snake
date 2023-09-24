<script setup lang="ts">
import SnakeLevelTile from "./SnakeLevelTile.vue";
import SnakeSkinItem from "./SnakeSkinItem.vue";
import {ref} from "vue";
import {GetSnakeStorage} from "../engine/SnakeStorage.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const selectedSkin = ref<string>(GetSnakeStorage().snakeSkins[0]);
const selectedLevel = ref<string>("");

function onOpenInfo(level: string) {
  selectedLevel.value = level;
}
function onCloseInfo() {
  selectedLevel.value = "";
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
    <div class="world-container world-1">
      <h2>World 1 - Easy</h2>
      <div>
        <SnakeLevelTile level="1-1" :locked="false" :opened-info="selectedLevel==='1-1'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="1-2" :locked="false" :opened-info="selectedLevel==='1-2'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="1-3" :locked="true" :opened-info="selectedLevel==='1-3'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="1-4" :locked="true" :opened-info="selectedLevel==='1-4'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="1-5" :locked="true" :opened-info="selectedLevel==='1-5'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
      </div>
    </div>
    <div class="world-container world-2">
      <h2>World 2 - Medium</h2>
      <div>
        <SnakeLevelTile level="2-1" :locked="true" :opened-info="selectedLevel==='2-1'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="2-2" :locked="true" :opened-info="selectedLevel==='2-2'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="2-3" :locked="true" :opened-info="selectedLevel==='2-3'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="2-4" :locked="true" :opened-info="selectedLevel==='2-4'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="2-5" :locked="true" :opened-info="selectedLevel==='2-5'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
      </div>
    </div>
    <div class="world-container world-3">
      <h2>World 3 - Hard</h2>
      <div>
        <SnakeLevelTile level="3-1" :locked="true" :opened-info="selectedLevel==='3-1'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="3-2" :locked="true" :opened-info="selectedLevel==='3-2'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="3-3" :locked="true" :opened-info="selectedLevel==='3-3'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="3-4" :locked="true" :opened-info="selectedLevel==='3-4'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="3-5" :locked="true" :opened-info="selectedLevel==='3-5'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
      </div>
    </div>
    <div class="world-container world-4">
      <h2>World 4 - Expert</h2>
      <div>
        <SnakeLevelTile level="4-1" :locked="true" :opened-info="selectedLevel==='4-1'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="4-2" :locked="true" :opened-info="selectedLevel==='4-2'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="4-3" :locked="true" :opened-info="selectedLevel==='4-3'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="4-4" :locked="true" :opened-info="selectedLevel==='4-4'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
        <SnakeLevelTile level="4-5" :locked="true" :opened-info="selectedLevel==='4-5'" :on-open-info="onOpenInfo" :on-close-info="onCloseInfo"/>
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