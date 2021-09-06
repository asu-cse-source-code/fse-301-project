import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "../imports/ui/views/Home.vue";

const routes = [
  { path: "/", alias: "/#/", name: "Home", component: Home },
  {
    path: "/about/",
    name: "About",
    component: () => import("../imports/ui/views/About.vue"),
  },
  {
    path: "/calendar/",
    name: "Calendar",
    component: () => import("../imports/ui/views/Calendar.vue"),
  },
  {
    path: "/full-list/",
    name: "List",
    // props: true,
    component: () => import("../imports/ui/views/List.vue"),
  },
  {
    path: "/login/",
    name: "Login",
    component: () => import("../imports/ui/views/Login.vue"),
  },
  //   { path: "/404", component: () => import("./views/NotFound.vue") },
  //   { path: "*", component: () => import("./views/NotFound.vue") },
];

const router = new VueRouter({
  routes,
});

export default router;
