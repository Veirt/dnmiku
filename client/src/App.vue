<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
import NavBar from "./components/NavBar.vue";
import { defineComponent } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: { NavBar },
  setup() {
    const store = useStore();

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
        } else {
          throw new Error("There is no token");
        }
      } catch (err) {}
    };

    verifyToken();
  },
});
</script>
