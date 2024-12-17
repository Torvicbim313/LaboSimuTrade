import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Chart from './views/Chart.vue'

const routes = [
    {path: "/", component: Home},
    {path: "/chart", component: Chart}
]

export const router = createRouter({history: createWebHashHistory(), routes})