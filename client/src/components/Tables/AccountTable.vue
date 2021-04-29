<template>
  <TableLayout>
    <div>
      <h2 class="text-2xl font-semibold leading-tight">Users</h2>
    </div>
    <div class="flex flex-col my-2 sm:flex-row">
      <div class="flex flex-row mb-1 sm:mb-0">
        <div class="relative">
          <select
            class="block w-full h-full px-4 py-2 pr-8 leading-tight text-white bg-black rounded-l appearance-none focus:outline-none focus:bg-black"
          >
            <option :value="10">10</option>
            <option :value="0">All</option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 text-red-300 pointer-events-none"
          >
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
        <div class="relative">
          <select
            class="block w-full h-full px-4 py-2 pr-8 leading-tight text-white bg-black border border-black rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none"
          >
            <option :value="0">All</option>
            <option :value="1">Online</option>
            <option :value="2">Offline</option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 text-red-300 pointer-events-none"
          >
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center h-full pl-2">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-red-300 fill-current">
            <path
              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
            ></path>
          </svg>
        </span>
        <input
          placeholder="Search"
          class="block w-full py-2 pl-8 pr-6 text-sm text-gray-300 placeholder-gray-400 bg-black border border-b border-black rounded appearance-none sm:rounded-l-none focus:text-white focus:placeholder-gray-300 focus:outline-none"
        />
      </div>
    </div>
    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                v-for="columnName in column"
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase bg-black border-b-2"
              >
                {{ columnName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts">
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ account.AccountId }}
                </p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ account.AccountName }}
                </p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ account.AccountLevelCode }}
                </p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ account.Email ?? "-" }}
                </p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ account.RegisterDate }}
                </p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ account.LastLoginDate ?? "Never logged in" }}
                </p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ account.cash }}
                </p>
              </td>
              <!-- <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">Vera Carpenter</p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">Admin</p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">Jan 21, 2020</p>
              </td>

              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <span
                  class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                  ></span>
                  <span class="relative">Activo</span>
                </span>
              </td> -->
            </tr>
          </tbody>
        </table>
        <div
          class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
        >
          <span class="text-xs text-gray-900 xs:text-sm"> 50 Entries </span>
          <div class="inline-flex mt-2 xs:mt-0">
            <button
              class="px-4 py-2 text-sm font-semibold text-white transition delay-100 bg-black rounded-l disabled:cursor-not-allowed enabled:hover:text-red-300"
            >
              Prev
            </button>
            <button
              class="px-4 py-2 text-sm font-semibold text-white transition delay-100 bg-black rounded-r enabled:hover:text-red-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </TableLayout>
</template>

<script setup lang="ts">
import TableLayout from "../Layout/TableLayout.vue";
import account from "../../composables/account";

const { accounts, getAccounts } = account();

const column = [
  "Id",
  "Account Name",
  "Role",
  "Email",
  "Register Date",
  "Last Login",
  "Cash",
];

getAccounts();
</script>
