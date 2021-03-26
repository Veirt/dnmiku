<template>
  <form @submit.prevent="createAccount">
    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <span class="mr-1 text-red-400">*</span>Username
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="account.AccountName"
          class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          type="text"
          placeholder="Username"
          :required="true"
        />
      </div>
      <p
        v-if="error.AccountName.length"
        class="text-xs text-right text-red-500"
      >
        {{ error.AccountName[0] }}
      </p>
    </div>

    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <span class="mr-1 text-red-400">*</span> Email
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="account.Email"
          type="text"
          class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          placeholder="Email"
          :required="true"
        />
      </div>
      <p v-if="error.Email.length" class="text-xs text-right text-red-500">
        {{ error.Email[0] }}
      </p>
    </div>

    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <span class="mr-1 text-red-400">*</span>Password
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="account.Password"
          type="password"
          placeholder="Password"
          class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          :required="true"
          autocomplete="off"
        />
      </div>
      <p v-if="error.Password.length" class="text-xs text-right text-red-500">
        {{ error.Password[0] }}
      </p>
    </div>

    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <span class="mr-1 text-red-400">*</span> Repeat Password
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="ConfirmPassword"
          type="password"
          placeholder="Repeat your password"
          class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          :required="true"
          autocomplete="off"
        />
      </div>
      <p class="text-xs text-right text-red-500"></p>
    </div>

    <div class="relative mt-6">
      <input
        type="submit"
        class="absolute w-full px-4 py-2 text-lg font-bold text-center text-white bg-black rounded cursor-pointer hover:text-red-300"
        value="REGISTER"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      account: {
        AccountName: "",
        Email: "",
        Password: "",
      },
      error: {
        AccountName: new Array<string>(),
        Email: new Array<string>(),
        Password: new Array<string>(),
      },
      ConfirmPassword: "",
    };
  },

  methods: {
    async createAccount() {
      this.resetErrors();
      try {
        await axios({
          method: "POST",
          baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
          url: "/api/v1/accounts",
          data: this.account,
        });

        console.log("success");
      } catch (err) {
        if (err.response.status === 400) {
          err.response.data.forEach(
            (error: { field: string; message: string }) => {
              switch (error.field) {
                case "AccountName":
                  this.error.AccountName.push(error.message);
                  break;
                case "Email":
                  this.error.Email.push(error.message);
                  break;
                case "Password":
                  this.error.Password.push(error.message);
                  break;
              }
            }
          );
        }
      }
    },

    resetErrors() {
      this.error.AccountName = new Array<string>();
      this.error.Email = new Array<string>();
      this.error.Password = new Array<string>();
    },
  },
});
</script>
