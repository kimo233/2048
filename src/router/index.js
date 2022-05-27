import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/rank',
    name:'rank',
    component: () => import(/* webpackChunkName: "about" */ '../views/userRankView.vue')
  },
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/loginView.vue')
  },
  {
    path:'/manage',
    name:'manage',
    component: () => import(/* webpackChunkName: "about" */ '../views/userManageView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
