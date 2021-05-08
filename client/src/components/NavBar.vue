<template>
  <nav v-show="store.getters.done" class="px-8 pt-2 bg-black shadow-md">
    <div class="flex justify-center -mb-px">
      <router-link
        :to="{ name: 'Home' }"
        class="py-3 mr-8 text-xs font-bold tracking-wide text-white no-underline uppercase transition duration-200 ease-in-out hover:text-red-300"
        >Home</router-link
      >
      <router-link
        :to="{ name: 'Download' }"
        class="py-3 mr-8 text-xs font-bold tracking-wide text-white no-underline uppercase transition duration-200 ease-in-out hover:text-red-300"
        >Download</router-link
      >
      <router-link
        :to="{ name: 'Admin' }"
        v-if="store.getters.isAdmin"
        class="py-3 mr-8 text-xs font-bold tracking-wide text-white no-underline uppercase transition duration-200 ease-in-out hover:text-red-300"
        >Admin</router-link
      >
      <router-link
        :to="{ name: 'Register' }"
        v-if="!store.getters.accessToken"
        class="py-3 mr-8 text-xs font-bold tracking-wide text-white no-underline uppercase transition duration-200 ease-in-out hover:text-red-300"
        >Register</router-link
      >
      <router-link
        :to="{ name: 'Login' }"
        v-if="!store.getters.accessToken"
        class="py-3 mr-8 text-xs font-bold tracking-wide text-white no-underline uppercase transition duration-200 ease-in-out hover:text-red-300"
        >Login</router-link
      >
      <a
        @click="logOut"
        v-if="store.getters.accessToken"
        class="py-3 mr-8 text-xs font-bold tracking-wide text-white no-underline uppercase transition duration-200 ease-in-out cursor-pointer hover:text-red-300"
        >Logout</a
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const logOut = () => {
  document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  store.commit("logOut");
};
</script>

<style scoped>
.router-link-active {
  color: #fca5a5;
  border-bottom-width: 2px;
  border-color: #fca5a5;
}
</style>
