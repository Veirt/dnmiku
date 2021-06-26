<template>
  <div class="flex items-center justify-center px-5 py-5 min-w-screen">
    <div class="w-full max-w-3xl">
      <div class="-mx-2 md:flex">
        <div class="w-full px-2 md:w-1/3">
          <div class="mb-4 rounded-lg shadow-sm">
            <div
              class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl"
            >
              <div class="relative px-3 pt-8 pb-10 text-center">
                <i class="mb-4 text-3xl fa fa-user"></i>
                <h4 class="text-sm text-red-400 uppercase">Accounts</h4>
                <h3
                  class="my-3 text-3xl font-semibold leading-tight text-black"
                  id="accounts"
                >
                  {{ playerStats.accounts }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-2 md:w-1/3">
          <div class="mb-4 rounded-lg shadow-sm">
            <div
              class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl"
            >
              <div class="relative px-3 pt-8 pb-10 text-center">
                <i class="mb-4 text-3xl fa fa-users"></i>
                <h4 class="text-sm text-red-400 uppercase">Characters</h4>
                <h3
                  class="my-3 text-3xl font-semibold leading-tight text-gray-700"
                  id="characters"
                >
                  {{ playerStats.characters }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-2 md:w-1/3">
          <div class="mb-4 rounded-lg shadow-sm">
            <div
              class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl"
            >
              <div class="relative px-3 pt-8 pb-10 text-center">
                <i class="mb-4 text-3xl fa fa-globe"></i>
                <h4 class="text-sm text-red-400 uppercase">Online</h4>
                <h3
                  class="my-3 text-3xl font-semibold leading-tight text-gray-700"
                  id="online"
                >
                  {{ playerStats.online }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import axios from "../../api/axios"

const playerStats = ref({
  accounts: "Loading",
  characters: "Loading",
  online: "Loading",
})
;(async () => {
  const res = await axios({
    method: "GET",
    url: "status/players",
  })
  playerStats.value = res.data
})()
</script>
