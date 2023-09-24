import { createApp } from 'vue'
import './style.css'
import './assets.css'
import App from './App.vue'
import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import SnakeHome from "./components/games/snake/ui/SnakeHome.vue";
import SnakeGame from "./components/games/snake/ui/SnakeGame.vue";
import SnakeModeSelector from "./components/games/snake/ui/SnakeModeSelector.vue";
import SnakeLevelSelector from "./components/games/snake/ui/SnakeLevelSelector.vue";
import SnakeSkinSelector from "./components/games/snake/ui/SnakeSkinSelector.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", component: SnakeHome },
    { path: "/menu", component: SnakeModeSelector },
    { path: "/levels", component: SnakeLevelSelector },
    { path: "/game/:level", component: SnakeGame },
    { path: "/snake-skin", component: SnakeSkinSelector },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const createdApp = createApp(App);

createdApp.use(router);
createdApp.mount('#app');
