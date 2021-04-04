<template>
  <form @submit.prevent="login">
    <div class="flex -mx-3">
      <div class="w-full px-3 mb-5">
        <div
          class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
        >
          <label for="AccountName" class="mr-1 text-red-400">*</label>Username
        </div>
        <div class="flex">
          <div
            class="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"
          >
            <i class="text-lg text-gray-400 mdi mdi-email-outline"></i>
          </div>
          <input
            v-model="account.AccountName"
            type="text"
            id="AccountName"
            class="w-full py-2 pl-10 pr-3 -ml-10 bg-gray-100 border-b-2 border-red-300 outline-none"
            placeholder="Username"
          />
        </div>
      </div>
    </div>
    <div class="flex -mx-3">
      <div class="w-full px-3 mb-12">
        <div
          class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
        >
          <label for="Password" class="mr-1 text-red-400">*</label>Password
        </div>
        <div class="flex">
          <div
            class="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"
          >
            <i class="text-lg text-gray-400 mdi mdi-lock-outline"></i>
          </div>
          <input
            v-model="account.Password"
            type="password"
            id="Password"
            class="w-full py-2 pl-10 pr-3 -ml-10 bg-gray-100 border-b-2 border-red-300 outline-none"
            placeholder="Password"
          />
        </div>
      </div>
    </div>
    <div class="flex -mx-3">
      <div class="w-full px-3 mb-5">
        <button
          type="submit"
          class="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-white bg-black rounded-lg hover:text-red-300 focus:text-red-300"
        >
          LOGIN
        </button>
      </div>
    </div>
    <div class="flex -mx-3">
      <div class="w-full px-3 mb-5">
        <router-link :to="{ name: 'Login' }">Forgot password ?</router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const store = useStore();

    const account = reactive({
      AccountName: "",
      Password: "",
    });

    const login = async () => {
      try {
        await axios({
          method: "POST",
          baseURL: store.getters.apiUrl,
          url: "/api/v1/auth",
          withCredentials: true,
          data: account,
        });
        alert("success");
      } catch (err) {
        alert(err);
      }
    };

    return { account, login };
  },
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css");
</style>
