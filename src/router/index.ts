import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Welcome from "@/views/Welcome.vue";
import Subreddits from "@/views/Subreddits.vue";

Vue.use(VueRouter);

const routes = [
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

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
