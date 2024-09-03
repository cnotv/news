import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import Subreddits from '@/views/Subreddits.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/subreddits',
    name: 'subreddits',
    component: Subreddits
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
