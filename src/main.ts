import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import SnakeHome from "./components/games/snake/ui/SnakeHome.vue";
import SnakeGame from "./components/games/snake/ui/SnakeGame.vue";
import SnakeMenu from "./components/games/snake/ui/SnakeMenu.vue";
import SnakeLevelSelector from "./components/games/snake/ui/SnakeLevelSelector.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", component: SnakeHome },
    { path: "/menu", component: SnakeMenu },
    { path: "/levels", component: SnakeLevelSelector },
    { path: "/game/:level", component: SnakeGame },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const createdApp = createApp(App);

createdApp.use(router);
createdApp.mount('#app');
