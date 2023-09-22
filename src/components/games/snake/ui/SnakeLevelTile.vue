<script setup lang="ts">
import {useRouter} from "vue-router";
import {GetLevelData} from "../engine/SnakeStorage";
import {GetChallengesTexts} from "../levels/SnakeChallengesServer.ts";

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
</script>

<template>
  <div class="level-tile-container" :class="difficultyClass">
    <div class="level-tile">
      <div class="star-indicator floating-star-indicator" v-bind:class="[`star-${amountOfChallengesCompleted}`]"/>
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
          <div class="level-challenges">
            <h3>Level challenges</h3>
            <div>
              <div class="level-challenge">
                <div class="star-indicator" :class="[levelProgression.completedChallenges[0]?'star-3':'star-0']"/>
                <p>{{challengesTexts[0]}}</p>
              </div>
              <div class="level-challenge">
                <div class="star-indicator" :class="[levelProgression.completedChallenges[1]?'star-3':'star-0']"/>
                <p>{{challengesTexts[1]}}</p>
              </div>
              <div class="level-challenge">
                <div class="star-indicator" :class="[levelProgression.completedChallenges[2]?'star-3':'star-0']"/>
                <p>{{challengesTexts[2]}}</p>
              </div>
            </div>
          </div>
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
.level-challenges>h3 {
  margin: 0;
}
.level-challenge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.start-level-button {
  background-color: transparent;
  padding: 0.2rem 0.5rem;
  margin-top: 0.5rem;
  border: 2px solid #eee;
  border-radius: 1rem;
  cursor: pointer;
}
.floating-star-indicator {
  top: 5px;
  right: 5px;
  position: absolute;
}
.star-indicator {
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: cover;
}
.star-0 {
  background-image: url("src/assets/stars/StarNone.png");
}
.star-1 {
  background-image: url("src/assets/stars/StarBronze.png");
}
.star-2 {
  background-image: url("src/assets/stars/StarSilver.png");
}
.star-3 {
  background-image: url("src/assets/stars/StarGold.png");
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