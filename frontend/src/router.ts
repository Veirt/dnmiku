import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "./store";
import axios from "axios";

const verifyToken = async () => {
  const cookies = Object.fromEntries(
    document.cookie.split(/; */).map((c) => {
      const [key, v] = c.split("=", 2);
      return [key, decodeURIComponent(v)];
    })
  );

  if (cookies.token) {
    try {
      const res = await axios({
        method: "POST",
        baseURL: store.getters.getApiUrl,
        url: "/api/v1/auth",
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });

      if (res.data.token) {
        store.dispatch("setAuthStatus", {
          token: res.data.token,
          role: res.data.payload.role,
        });
      } else {
        throw new Error("There is no token");
      }
    } catch (err) {}
  } else {
    store.commit("SET_AUTH_CHECK");
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Home`,
    },
  },
  {
    path: "/download",
    name: "Download",
    component: () => import("./views/Download.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Download`,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/Login.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Login`,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./views/Register.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Register`,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("./views/Profile.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Profile`,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("./views/Admin/Admin.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Admin`,
    },
  },

  {
    path: "/admin/accounts",
    name: "ManageAccounts",
    component: () => import("./components/PassThrough.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Manage Account`,
    },
    children: [
      {
        path: "",
        component: () => import("./views/Admin/Account.vue"),
      },
      {
        path: "create",
        component: () => import("./views/Admin/Form/AccountForm.vue"),
      },
      {
        path: "edit/:id",
        component: () => import("./views/Admin/Form/AccountForm.vue"),
      },
    ],
  },

  {
    path: "/admin/characters",
    name: "ManageCharacters",
    component: () => import("./components/PassThrough.vue"),
    meta: {
      title: `${import.meta.env.VITE_APP_BASE_TITLE} | Manage Character`,
    },
    children: [
      {
        path: "",
        component: () => import("./views/Admin/Character.vue"),
      },
      {
        path: "create",
        component: () => import("./views/Admin/Form/CharacterForm.vue"),
      },
      {
        path: "edit/:id",
        component: () => import("./views/Admin/Form/CharacterForm.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("./views/Error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (_, __, next) => {
  if (!store.getters.getAuthCheck) {
    await verifyToken();
    store.commit("SET_AUTH_CHECK");
  }
  next();
});

export default router;
