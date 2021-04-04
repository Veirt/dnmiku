<template>
  <form @submit.prevent="createAccount">
    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <label for="AccountName" class="mr-1 text-red-400">*</label>Username
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="account.AccountName"
          type="text"
          id="AccountName"
          class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          placeholder="Username"
          :required="true"
        />
      </div>
      <p
        v-if="errors.AccountName.length"
        class="text-xs text-right text-red-500"
      >
        {{ errors.AccountName[0] }}
      </p>
    </div>

    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <label for="Email" class="mr-1 text-red-400">*</label> Email
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="account.Email"
          type="text"
          id="Email"
          class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          placeholder="Email"
          :required="true"
        />
      </div>
      <p v-if="errors.Email.length" class="text-xs text-right text-red-500">
        {{ errors.Email[0] }}
      </p>
    </div>

    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <label for="Password" class="mr-1 text-red-400">*</label>Password
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="account.Password"
          :required="true"
          type="password"
          id="Password"
          placeholder="Password"
          class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
          autocomplete="off"
        />
      </div>
      <p v-if="errors.Password.length" class="text-xs text-right text-red-500">
        {{ errors.Password[0] }}
      </p>
    </div>

    <div class="w-full">
      <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
        <label for="ConfirmPassword" class="mr-1 text-red-400">*</label> Repeat
        Password
      </div>
      <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
        <input
          v-model="account.ConfirmPassword"
          type="password"
          placeholder="Repeat your password"
          id="ConfirmPassword"
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
import { reactive, defineComponent, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  name: "RegisterForm",
  setup() {
    const store = useStore();

    const account = reactive({
      AccountName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    });
    const errors = reactive({
      AccountName: new Array<string>(),
      Email: new Array<string>(),
      Password: new Array<string>(),
    });

    const createAccount = async () => {
      try {
        await axios({
          method: "POST",
          baseURL: store.getters.apiUrl,
          url: "/api/v1/accounts",
          data: account,
        });
      } catch (err) {
        if (err.response.status === 400) {
          err.response.data.forEach(
            (error: { field: string; message: string }) => {
              switch (error.field) {
                case "AccountName":
                  errors.AccountName.push(error.message);
                  break;
                case "Email":
                  errors.Email.push(error.message);
                  break;
                case "Password":
                  errors.Password.push(error.message);
                  break;
              }
            }
          );
        }
      }
    };

    return { account, errors, createAccount };
  },
});
</script>
