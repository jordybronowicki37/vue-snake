<script setup lang="ts">
import {useRouter} from "vue-router";
import {GetLevelData} from "../engine/SnakeStorage";
import {GetChallengesTexts} from "../levels/SnakeChallengesServer.ts";
import SnakeLevelChallenges from "./SnakeLevelChallenges.vue";

const {level, openedInfo, onOpenInfo, onCloseInfo} = defineProps<{
  level:string;
  openedInfo: boolean;
  onOpenInfo: (level: string) => void;
  onCloseInfo: () => void;
}>();
const router = useRouter();
const levelProgression = GetLevelData(level);
const challengesTexts = GetChallengesTexts(level);
const amountOfChallengesCompleted = levelProgression.completedChallenges.filter(c => c).length;
const difficultyClass = `difficulty-${level[0]}`;
const challengesData: { text: string, completed: boolean }[] = [];
for (let i = 0; i < challengesTexts.length; i++) {
  challengesData.push({text: challengesTexts[i], completed: levelProgression.completedChallenges[i]})
}
</script>

<template>
  <div class="level-tile-container" :class="difficultyClass">
    <div class="level-tile">
      <div class="star-indicator" v-bind:class="[`star-${amountOfChallengesCompleted}`]"/>
      <button type="button" v-on:click="() => openedInfo ? onCloseInfo() : onOpenInfo(level)">{{level}}</button>
    </div>
    <transition name="fade" mode="out-in">
      <div :key="openedInfo+''" class="level-info" :hidden="!openedInfo">
        <div class="level-info-content-container">
          <div class="inverted-corners"><div/><div/></div>
          <div class="personal-stats">
            <div class="high-score-container">
              <p>High-score: </p>
              <p>{{levelProgression.highScore}}</p>
            </div>
          </div>
          <SnakeLevelChallenges :challenges="challengesData"/>
          <button class="start-level-button" type="button" v-on:click="router.push(`/game/${level}`)">Start level ⮞</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.level-tile-container {
  position: relative;
}
.level-tile {
  position: relative;
}
.level-tile button {
  font-size: 24px;
  font-weight: bolder;
  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  background-color: var(--difficulty-color);
}
.level-info {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  padding: 0.5rem;
  width: 15rem;
  border-radius: 1rem;
  background-color: var(--difficulty-color);
}
.level-info-content-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.high-score-container {
  display: flex;
  gap: 1rem;
}
.inverted-corners {
  display: flex;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, 0);
}
.inverted-corners div {
  width: 20px;
  height: 10px;
  overflow: hidden;
  position: relative;
}
.inverted-corners div:before {
  content: "";
  display: block;
  width: 200%;
  height: 200%;
  position: absolute;
  border-radius: 50%;
}
.inverted-corners div:first-child:before {
  bottom: 0;
  right: 0;
  box-shadow: 10px 10px 0 0 var(--difficulty-color);
}
.inverted-corners div:last-child:before {
  bottom: 0;
  left: 0;
  box-shadow: -10px 10px 0 0 var(--difficulty-color);
}
.start-level-button {
  background-color: transparent;
  padding: 0.2rem 0.5rem;
  margin-top: 0.5rem;
  border: 2px solid #eee;
  border-radius: 1rem;
  cursor: pointer;
}
.star-indicator {
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  top: 5px;
  right: 5px;
  position: absolute;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>