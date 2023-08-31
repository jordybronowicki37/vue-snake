import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import SnakeHome from "./components/games/snake/SnakeHome.vue";
import SnakeGame from "./components/games/snake/SnakeGame.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", component: SnakeHome },
    { path: "/game", component: SnakeGame },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const createdApp = createApp(App);

createdApp.use(router);
createdApp.mount('#app');
