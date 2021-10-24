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
    path: "/to-do/",
    name: "List",
    component: () => import("../imports/ui/views/List.vue"),
  },
  {
    path: "/login/:prop",
    name: "Login",
    props: true,
    component: () => import("../imports/ui/views/Login.vue"),
  },
  {
    path: "/user/:id",
    name: "Profile",
    props: true,
    component: () => import("../imports/ui/views/Profile.vue"),
  },
  {
    path: "/info/",
    name: "Info",
    component: () => import("../imports/ui/views/Info.vue"),
  },
  {
    path: "/create/",
    name: "Create",
    component: () => import("../imports/ui/views/TaskCreation.vue"),
  },
  {
    path: "/admin/",
    name: "Admin",
    component: () => import("../imports/ui/views/Admin.vue"),
  },
  {
    path: "/task/:taskId",
    name: "Task",
    props: true,
    component: () => import("../imports/ui/views/ViewTask.vue"),
  },
  { path: "/404", component: () => import("../imports/ui/views/NotFound.vue") },
  { path: "*", component: () => import("../imports/ui/views/NotFound.vue") },
];

const router = new VueRouter({
  routes,
});

export default router;
