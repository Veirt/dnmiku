import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Home`,
    },
  },
  {
    path: "/download",
    name: "Download",
    component: () => import("../views/Download.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Download`,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Login`,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Register`,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
