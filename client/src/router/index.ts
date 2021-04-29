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
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin/Admin.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Admin`,
    },
  },

  {
    path: "/admin/accounts",
    name: "ManageAccounts",
    component: () => import("../views/Admin/Account.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Manage Account`,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
