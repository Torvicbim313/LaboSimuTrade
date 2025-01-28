import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Chart from './views/Chart.vue'
import Afternoons2_2 from './components/afternoons2_2.vue'

const routes = [
    {path: "/", component: Home},
    {path: "/chart", component: Chart},
    {path: "/afternoons2_2", component: Afternoons2_2}
]

export const router = createRouter({history: createWebHashHistory(), routes})