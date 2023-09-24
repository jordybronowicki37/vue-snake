<script setup lang="ts">
defineProps<{ challenges: { text: string, completed: boolean }[] }>()
</script>

<template>
  <div class="level-challenges">
    <h3>Level challenges</h3>
    <div>
      <div class="level-challenge" v-for="challenge in challenges">
        <div class="star-indicator" :class="[challenge.completed?'star-3':'star-0']"/>
        <p>{{challenge.text}}</p>
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
</style>