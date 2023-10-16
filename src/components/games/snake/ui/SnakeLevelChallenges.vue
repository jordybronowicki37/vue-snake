<script setup lang="ts">
import {SnakeLevelChallengePreview} from "../engine/SnakeTypes.ts";
import {ref} from "vue";

const {challenges} = defineProps<{ challenges: SnakeLevelChallengePreview[] }>();
const oldState = ref(challenges.map(v => v.completed));
</script>

<template>
  <div class="level-challenges">
    <h3>Level challenges</h3>
    <div>
      <div class="level-challenge" v-for="(challenge, index) in challenges" :key="index">
        <div
            class="star-indicator"
            :class="[
                challenge.completed ? 'star-3' : 'star-0',
                !oldState[index] && challenge.completed ? 'new-star' : ''
            ]"/>
        <p>{{challenge.title}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.level-challenges>h3 {
  margin: 0;
  white-space: nowrap
}
.level-challenge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.level-challenge>p {
  white-space: nowrap
}
.star-indicator {
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: cover;
}
.new-star {
  animation: tada 1s;
}
@keyframes tada {
  0% {
    transform: scale(1);
  }

  10%, 20% {
    transform: scale(.8) rotate(-3deg);
  }

  30%, 50%, 70%, 90% {
    transform: scale(1.3) rotate(3deg);
  }

  40%, 60%, 80% {
    transform: scale(1.3) rotate(-3deg);
  }

  100% {
    transform: scale(1);
  }
}
</style>