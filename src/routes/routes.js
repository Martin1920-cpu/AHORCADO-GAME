import Home from "../views/Home.vue"
import Categories from "../views/Categories.vue"
import Difficulty from "../views/Difficulty.vue"
import Game from "../views/Game.vue"
import Scoreboard from "../views/Scoreboard.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes =[
    {path:"/", component: Home},
    {path:"/categories", component: Categories},
    {path:"/difficulty", component: Difficulty},
    {path:"/game", component: Game},
    {path:"/scoreboard", component: Scoreboard}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes 
})