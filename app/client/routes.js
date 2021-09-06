import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "../imports/ui/views/Home.vue";

const routes = [
  { path: "/", alias: "/#/", name: "Home", component: Home },
  //   {
  //     path: "/stats/:username",
  //     name: "Stats",
  //     props: true,
  //     component: () => import("./views/Stats.vue"),
  //   },
  //   { path: "/404", component: () => import("./views/NotFound.vue") },
  //   { path: "*", component: () => import("./views/NotFound.vue") },
];

const router = new VueRouter({
  routes,
});

export default router;
