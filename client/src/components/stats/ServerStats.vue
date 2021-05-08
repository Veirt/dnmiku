<template>
  <div class="flex items-center justify-center px-5 py-5 min-w-screen">
    <div class="w-full max-w-3xl">
      <div class="flex flex-row -mx-2 md:flex">
        <div class="w-1/2 px-2 md:w-1/2">
          <div class="mb-4 rounded-lg shadow-sm">
            <div
              class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl"
            >
              <div class="relative px-3 pt-8 pb-10 text-center">
                <i class="mb-4 text-3xl fa fa-gamepad"></i>
                <h4 class="text-sm text-red-400 uppercase">Game Server</h4>
                <h3
                  :class="{
                    'text-green-500': server.game === 'Online',
                    'text-red-500': server.game === 'Offline',
                  }"
                  class="my-3 text-3xl font-semibold leading-tight"
                >
                  {{ server.game }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/2 px-2 md:w-1/2">
          <div class="mb-4 rounded-lg shadow-sm">
            <div
              class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl"
            >
              <div class="relative px-3 pt-8 pb-10 text-center">
                <i class="mb-4 text-3xl fa fa-home"></i>
                <h4 class="text-sm text-red-400 uppercase">Village Server</h4>
                <h3
                  :class="{
                    'text-green-500': server.village === 'Online',
                    'text-red-500': server.village === 'Offline',
                  }"
                  class="my-3 text-3xl font-semibold leading-tight"
                >
                  {{ server.village }}
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
import axios from "../../axios";
import { ref } from "vue";

const server = ref({
  game: "Loading",
  village: "Loading",
});

(async () => {
  const res = await axios.get("status/server");
  server.value = res.data.server;
})();
</script>
