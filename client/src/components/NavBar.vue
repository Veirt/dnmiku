<template>
  <nav class="px-8 pt-2 bg-black shadow-md">
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
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NavBar",
  setup() {
    const store = useStore();

    return { store };
  },
});
</script>

<style scoped>
.router-link-active {
  color: #fca5a5;
  border-bottom-width: 2px;
  border-color: #fca5a5;
}
</style>
