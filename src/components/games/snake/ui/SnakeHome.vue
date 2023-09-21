<script setup lang="ts">
import Grid from "../../../grid/Grid.vue";
import {ref} from "vue";
import {SnakeGameCellStyles} from "../engine/SnakeStyling";
import {SetupEmptyLevel} from "../engine/SnakeHelpers.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const GRID_HEIGHT = 3;
const GRID_WIDTH = 40;
const grid = ref<string[][]>(SetupEmptyLevel(GRID_HEIGHT, GRID_WIDTH, []));

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
<!--    <div class="blobs-background">-->
<!--      <div class="blob1"></div>-->
<!--      <div class="blob2"></div>-->
<!--    </div>-->
    <div class="moving-snake" hidden>
      <Grid :data="grid" :cell-styles="SnakeGameCellStyles('transparent', 'transparent')" :width="40" :height="3"/>
    </div>
    <div class="content">
      <h1>SnakeMaster</h1>

      <div class="introduction">
        <q>Welcome to SnakeMaster: The Ultimate Slithering Challenge</q>
        <p>Are you ready to embark on a thrilling snake adventure? SnakeMaster offers a variety of game modes to
          cater to all players, from solo adventurers to fierce competitors. Dive into the world of SnakeMaster
          and discover the modes that suit your style!</p>
      </div>

      <div class="game-modes-wrapper">
        <h2>Game Modes</h2>

        <div class="game-modes-container">
          <div class="game-mode">
            <h3>Single-Player Mode</h3>
            <p>Indulge in classic snake action as you navigate through challenging mazes, gobbling up food,
              and avoiding obstacles. Test your skills and aim for the highest score in this timeless solo adventure.</p>
          </div>
          <div class="game-mode">
            <h3>Battle Mode</h3>
            <p>Gather your friends or challenge AI opponents in a heart-pounding, last-snake-standing showdown.
              Utilize strategic power-ups and cunning maneuvers to outwit your rivals. Only the strongest will
              survive in this intense multiplayer battle.</p>
          </div>
          <div class="game-mode">
            <h3>Versus Mode</h3>
            <p>Team up or go solo in this unique multiplayer experience. Compete on separate boards, collecting
              fruits and striving to outlast your opponent. Coordinate your moves, employ clever strategies,
              and prove your dominance in the ultimate head-to-head challenge.</p>
          </div>
        </div>
      </div>

      <div class="outro">
        <p>Ready to become the SnakeMaster? Click the "Play Now" button below and begin your slithering journey!</p>
        <button v-on:click="router.push('menu')">Play now ></button>
      </div>
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
}

h1 {
  padding: 1rem 0;
  margin: 0;
  background-color: #333;
  color: #95d533;
  overflow: hidden;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}

.introduction {
  padding: 8rem 12rem;
  text-align: center;
}
.introduction q {
  font-size: 24px;
  font-weight: 500;
}
.introduction p {
  margin-top: 3rem;
}

.game-modes-container {
  display: flex;
}
.game-modes-wrapper>h2 {
  text-align: center;
  font-size: 40px;
  background-color: #a23d3d;
  margin: 0;
  padding: 1rem;
}
.game-mode {
  width: 100%;
  padding: 1rem;
}
.game-mode>h3 {
  font-size: 26px;
  margin: 0.5rem 0;
}
.game-mode:nth-child(1) {
  background-color: rebeccapurple;
}
.game-mode:nth-child(2) {
  background-color: dodgerblue;
}
.game-mode:nth-child(3) {
  background-color: forestgreen;
}

.outro {
  padding: 4rem 12rem;
}
.outro button {
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 10rem;
  border: none;
  background-color: green;
  float: right;
  font-size: 24px;
  cursor: pointer;
}
.outro button:hover {
  background-color: #008000cc;
}
</style>