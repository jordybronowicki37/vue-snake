<script setup lang="ts">
withDefaults(
    defineProps<{
      type: string,
      selectedSnake: string,
      canSelect?: boolean,
      onSelect: (type: string) => void,
    }>(),
    {
      canSelect: true,
    });
</script>

<template>
  <div class="snake-skin">
    <div class="preview"
         v-on:click="onSelect(type)"
         v-bind:class="[selectedSnake===type&&'selected', canSelect&&'can-select']">
      <div class="body-pieces">
        <div class="body-piece" v-bind:style="{backgroundImage: `var(--snake-${type.toLowerCase()}-head)`}"/>
        <div class="body-piece" v-bind:style="{backgroundImage: `var(--snake-${type.toLowerCase()}-straight)`}"/>
        <div class="body-piece" v-bind:style="{backgroundImage: `var(--snake-${type.toLowerCase()}-tail)`}"/>
      </div>
    </div>
    <p class="skin-name">{{type}}</p>
  </div>

</template>

<style scoped>
.snake-skin {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview {
  background-color: #2c2c2c;
  height: 5rem;
  width: 5rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  border: 2px solid #777;
  transition: all 0.5s;
}

.can-select:hover:not(.selected) {
  border: 2px solid #ddd;
  cursor: pointer;
}

.selected {
  border: 2px solid cornflowerblue;
}

.body-pieces {
  display: flex;
  flex-direction: column;
  position: absolute;
  rotate: -45deg;
  left: 2.5rem;
  top: 0.5rem;
}

.body-piece {
  height: 2rem;
  width: 2rem;
  background-repeat: no-repeat;
  background-size: cover;
}

.skin-name {
  cursor: default;
}
</style>