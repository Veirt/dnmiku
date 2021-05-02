import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";
import axios from "axios";

const verifyToken = async () => {
  const cookies = Object.fromEntries(
    document.cookie.split(/; */).map((c) => {
      const [key, v] = c.split("=", 2);
      return [key, decodeURIComponent(v)];
    })
  );

  try {
    const res = await axios({
      method: "GET",
      baseURL: store.getters.apiUrl,
      url: "/api/v1/accounts/@me",
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
      withCredentials: true,
    });

    if (res.data.accessToken) {
      store.commit("setAccessToken", res.data.accessToken);
      if (res.data.AccountLevelCode === 99) {
        store.commit("setAdmin", true);
      }
    } else {
      throw new Error("There is no token");
    }
  } catch (err) {}
};

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
    component: () => import("../components/PassThrough.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Manage Account`,
    },
    children: [
      {
        path: "",
        component: () => import("../views/Admin/Account.vue"),
      },
      {
        path: "create",
        component: () => import("../views/Admin/Form/AccountForm.vue"),
      },
      {
        path: "edit/:id",
        component: () => import("../views/Admin/Form/AccountForm.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/Error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let done = false;

router.beforeEach(async (_, __, next) => {
  if (!done) {
    done = true;
    await verifyToken();
  }
  next();
});

export default router;
