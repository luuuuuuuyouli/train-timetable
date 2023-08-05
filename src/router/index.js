import Home from '@/pages/home.vue'
import { createRouter,createWebHistory } from 'vue-router'

const basePath = "/train-timetable/"

const routes = [
    {
        path: basePath,
        name: 'home',
        component: Home
    },
    {
        path:basePath + 'main',
        name: 'main',
        meta: {
          requireAuth: true,
          keepAlive: false // 不需要缓存
        },
        component: () =>
          import('@/pages/main.vue')
    },
    {
        path:basePath + 'login',
        name: 'login',
        meta: {
          requireAuth: true,
          keepAlive: false // 不需要缓存
        },
        component: () =>
          import('@/pages/login.vue')
    },

]





const router = new createRouter({
    history:createWebHistory(),
    routes
})
  
export default router