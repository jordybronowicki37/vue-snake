<script setup lang="ts">
import {useRouter} from "vue-router";
import {GetLevelData} from "../engine/SnakeStorage";

const {level} = defineProps<{level:string}>();
const router = useRouter();
const levelProgression = GetLevelData(level);
const amountOfChallengesCompleted = levelProgression.completedChallenges.filter(c => c).length;
</script>

<template>
<div class="level-tile" v-bind:class="[`difficulty-${level[0]}`]">
  <div class="star-indicator" v-bind:class="[`star-${amountOfChallengesCompleted}`]"/>
  <button type="button" v-on:click="router.push(`/game/${level}`)">{{level}}</button>
</div>
</template>

<style scoped>
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
}
.difficulty-1 button {
  background-color: cornflowerblue;
}
.difficulty-2 button {
  background-color: #64a10c;
}
.difficulty-3 button {
  background-color: orange;
}
.difficulty-4 button {
  background-color: red;
}
.star-indicator {
  top: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
  position: absolute;
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
</style>