import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Welcome from "@/views/Welcome.vue";
import Subreddits from "@/views/Subreddits.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/welcome",
    name: "welcome",
    component: Welcome
  },
  {
    path: "/subreddits",
    name: "subreddits",
    component: Subreddits
  },
  {
    path: "*",
    redirect: "/"
  }
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});
