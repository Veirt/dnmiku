<template>
  <div v-if="!route.params.id" class="flex justify-center leading-loose">
    <form
      @submit.prevent="createAccount"
      class="flex-col max-w-xl p-10 m-4 bg-white rounded shadow-xl"
    >
      <p class="font-bold text-gray-800">Account Info</p>
      <div class="my-2">
        <label class="block text-sm text-gray-600" for="AccountName"
          >Account Name</label
        >
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none focus:placeholder-gray-500"
          id="AccountName"
          v-model="account.AccountName"
          type="text"
          placeholder="Account Name"
        />
      </div>
      <div class="my-2">
        <label class="text-sm text-gray-600" for="Email">Email</label>
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none"
          id="Email"
          v-model="account.Email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div class="my-2">
        <label class="text-sm text-gray-600" for="Password">Password</label>
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none"
          id="Password"
          v-model="account.Password"
          type="password"
          placeholder="Password"
        />
      </div>

      <div class="my-2">
        <label class="text-sm text-gray-600" for="ConfirmPassword"
          >Confirm Password</label
        >
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none"
          id="ConfirmPassword"
          v-model="account.ConfirmPassword"
          type="password"
          placeholder="Confirm your Password"
        />
      </div>

      <div class="flex flex-row my-2">
        <div class="flex flex-col w-1/2 mr-1">
          <label class="w-full text-sm text-gray-600" for="cash">Cash</label>
          <input
            class="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded outline-none"
            id="cash"
            v-model="account.cash"
            type="number"
            placeholder="Cash"
          />
        </div>
        <div class="flex flex-col w-1/2 ml-1">
          <label class="w-full text-sm text-gray-600" for="AccountLevelCode"
            >Account Level</label
          >

          <select
            v-model="account.AccountLevelCode"
            class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded outline-none"
            id="AccountLevelCode"
          >
            <option :value="0">Player</option>
            <option :value="99">QA</option>
            <option :value="100">Developer</option>
          </select>
        </div>
      </div>

      <div class="mt-4">
        <button
          class="px-4 py-1 tracking-wider text-white transition delay-100 bg-gray-900 rounded hover:text-red-300"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  </div>
  <div v-else class="flex justify-center leading-loose">
    <form
      @submit.prevent="editAccount(parseInt(id))"
      class="flex-col max-w-xl p-10 m-4 bg-white rounded shadow-xl"
    >
      <p class="font-bold text-gray-800">AccountID {{ $route.params.id }}</p>
      <div class="my-2">
        <label class="block text-sm text-gray-600" for="AccountName"
          >Account Name</label
        >
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none focus:placeholder-gray-500"
          id="AccountName"
          v-model="account.AccountName"
          type="text"
          placeholder="Account Name"
        />
      </div>
      <div class="my-2">
        <label class="text-sm text-gray-600" for="Email">Email</label>
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none"
          id="Email"
          v-model="account.Email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div class="flex flex-row my-2">
        <div class="flex flex-col w-1/2 mr-1">
          <label class="w-full text-sm text-gray-600" for="cash">Cash</label>
          <input
            class="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded outline-none"
            id="cash"
            v-model="account.cash"
            type="number"
            placeholder="Cash"
          />
        </div>
        <div class="flex flex-col w-1/2 ml-1">
          <label class="w-full text-sm text-gray-600" for="AccountLevelCode"
            >Account Level</label
          >

          <select
            v-model="account.AccountLevelCode"
            class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded outline-none"
            id="AccountLevelCode"
          >
            <option :value="0">Player</option>
            <option :value="99">QA</option>
            <option :value="100">Developer</option>
          </select>
        </div>
      </div>

      <div class="mt-4">
        <button
          class="px-4 py-1 tracking-wider text-white transition delay-100 bg-gray-900 rounded hover:text-red-300"
          type="submit"
        >
          Edit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  account,
  getAccountById,
  createAccount,
  editAccount,
} from "../../../composables/accountEndpoints";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;

if (route.params.id) {
  getAccountById(parseInt(id));
}
</script>
