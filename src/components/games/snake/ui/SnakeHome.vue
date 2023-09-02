<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import {SnakeGameCellStyles} from "../engine/SnakeStyling";
import {SetupEmptyGrid} from "../engine/SnakeLogic";

const GRID_HEIGHT = 3;
const GRID_WIDTH = 40;
const grid = ref<string[][]>(SetupEmptyGrid(GRID_HEIGHT, GRID_WIDTH));

grid.value[1][6] = "F";
grid.value[1][15] = "F";
grid.value[1][18] = "HGL";
grid.value[1][19] = "SGL";
grid.value[1][20] = "SGL";
grid.value[1][21] = "SGL";
grid.value[1][22] = "TGL";

</script>

<template>
  <div id="snake-home">
    <div class="blobs-background">
      <div class="blob1"></div>
      <div class="blob2"></div>
    </div>
    <div class="moving-snake">
      <Grid :data="grid" :cell-styles="SnakeGameCellStyles('transparent', 'transparent')" :width="40" :height="3"/>
    </div>
    <div class="content">
      <h1>Snake game</h1>
    </div>
  </div>
</template>

<style scoped>
#snake-home {
  position: relative;
  height: 100%;
}

.blobs-background div {
  position: absolute;
  filter: blur(40px);
}

.blob1 {
  background: #adff35;
  top: 20rem;
  left: 30rem;
  height: 150px;
  width: 200px;
  transform: rotate(-180deg);
  animation: blob-transform 8s ease-in-out infinite both alternate, blob-movement-1 20s ease-in-out infinite both;
}

.blob2 {
  background: #598c05;
  top: 28rem;
  left: 35rem;
  height: 100px;
  width: 150px;
  animation: blob-transform 15s ease-in-out infinite both alternate, blob-movement-2 10s ease-in-out infinite both;
}

@keyframes blob-transform
{
  0%,
  100% { border-radius: 33% 67% 70% 30% / 30% 40% 70% 70%; }
  20% { border-radius: 37% 63% 51% 49% / 37% 35% 35% 63%; }
  40% { border-radius: 36% 64% 64% 36% / 64% 48% 52% 26%; }
  60% { border-radius: 37% 63% 51% 49% / 30% 30% 70% 73%; }
  80% { border-radius: 40% 60% 42% 58% / 51% 51% 49% 59%; }
}

@keyframes blob-movement-1
{
  0%,
  500% { transform: none; }
  50% { transform: translate(50%, 20%) rotate(-200deg) scale(1.3);}
}

@keyframes blob-movement-2
{
  0%,
  100% { transform: none; }
  50% { transform: translate(50%, 20%) rotateY(10deg) scale(1); }
}

.moving-snake {
  position: absolute;
  top: 25rem;
  width: 100%;
  overflow: hidden;
}

.content {
  padding: 10rem;
}

.content h1 {
  margin: 0;
  color: #95d533;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>