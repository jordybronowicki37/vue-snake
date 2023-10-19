<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <div id="snake-home">
    <div class="blobs-background">
      <div class="blob1"></div>
      <div class="blob2"></div>
    </div>
    <div class="content">
      <div class="introduction">
        <p>Ready to get</p>
        <p>Slithering?</p>
        <router-link to="/menu">Play now</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
#snake-home {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
}

.content {
  margin-right: 20rem;
}

.blobs-background div {
  position: absolute;
  filter: blur(40px);
}

.blob1 {
  background: #adff35;
  top: 15rem;
  right: 30%;
  height: 150px;
  width: 200px;
  transform: rotate(-180deg);
  animation: blob-transform 8s ease-in-out infinite both alternate, blob-movement-1 20s ease-in-out infinite both;
}

.blob2 {
  background: #598c05;
  top: 23rem;
  right: 35%;
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

.introduction {
  display: flex;
  flex-direction: column;
  margin: 10rem;
}
.introduction p {
  font-size: 50px;
  font-weight: 800;
  color: white;
  margin: 0;
  text-transform: uppercase;
}
.introduction p:first-child {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px white;
}
.introduction a {
  width: fit-content;
  padding: 0.5rem 2rem;
  margin-top: 1rem;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 2rem;
  color: white;
  font-size: 30px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
}
.introduction a:hover {
  color: black;
  background-color: white;
}
</style>