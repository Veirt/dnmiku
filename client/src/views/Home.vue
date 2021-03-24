<template>
  <header>
    <div
      class="w-full bg-cover bg-center"
      style="height: 32rem"
      :style="{ backgroundImage: `url('${banner}')` }"
      title="Dragon Nest Red Lotus"
    >
      <div
        class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50"
      >
        <div class="text-center">
          <h1 class="text-white text-2xl font-semibold uppercase md:text-3xl">
            DN <span class="text-red-300">Miku</span>
          </h1>
        </div>
      </div>
    </div>
  </header>
  <div class="min-w-screen flex items-center justify-center px-5 py-5">
    <div class="w-full max-w-3xl">
      <div class="-mx-2 md:flex">
        <div class="w-full px-2 md:w-1/3">
          <div class="rounded-lg shadow-sm mb-4">
            <div
              class="rounded-lg bg-white shadow-lg relative overflow-hidden md:shadow-xl"
            >
              <div class="px-3 pt-8 pb-10 text-center relative">
                <i class="fa fa-user mb-4 text-3xl"></i>
                <h4 class="text-sm uppercase text-red-400">Accounts</h4>
                <h3
                  class="text-3xl text-black font-semibold leading-tight my-3"
                  id="accounts"
                >
                  Pending
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-2 md:w-1/3">
          <div class="rounded-lg shadow-sm mb-4">
            <div
              class="rounded-lg bg-white shadow-lg relative overflow-hidden md:shadow-xl"
            >
              <div class="px-3 pt-8 pb-10 text-center relative">
                <i class="fa fa-users mb-4 text-3xl"></i>
                <h4 class="text-sm uppercase text-red-400">Characters</h4>
                <h3
                  class="text-3xl text-gray-700 font-semibold leading-tight my-3"
                  id="characters"
                >
                  Pending
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-2 md:w-1/3">
          <div class="rounded-lg shadow-sm mb-4">
            <div
              class="rounded-lg bg-white shadow-lg relative overflow-hidden md:shadow-xl"
            >
              <div class="px-3 pt-8 pb-10 text-center relative">
                <i class="fa fa-globe mb-4 text-3xl"></i>
                <h4 class="text-sm uppercase text-red-400">Online</h4>
                <h3
                  class="text-3xl text-gray-700 font-semibold leading-tight my-3"
                  id="online"
                >
                  Pending
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="min-w-screen flex items-center justify-center px-5 py-5">
    <div class="w-full max-w-3xl">
      <div class="-mx-2 md:flex">
        <div class="w-full px-2 md:w-1/2">
          <div class="rounded-lg shadow-sm mb-4">
            <div
              class="rounded-lg bg-white shadow-lg relative overflow-hidden md:shadow-xl"
            >
              <div class="px-3 pt-8 pb-10 text-center relative">
                <i class="fa fa-gamepad mb-4 text-3xl"></i>
                <h4 class="text-sm uppercase text-red-400">Game Server</h4>
                <h3
                  class="text-3xl font-semibold leading-tight my-3"
                  id="gameserver"
                >
                  Pending
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-2 md:w-1/2">
          <div class="rounded-lg shadow-sm mb-4">
            <div
              class="rounded-lg bg-white shadow-lg relative overflow-hidden md:shadow-xl"
            >
              <div class="px-3 pt-8 pb-10 text-center relative">
                <i class="fa fa-home mb-4 text-3xl"></i>
                <h4 class="text-sm uppercase text-red-400">Village Server</h4>
                <h3
                  class="text-3xl font-semibold leading-tight my-3"
                  id="villageserver"
                >
                  Pending
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      banner: require("@/assets/images/RedLotus.jpg"),
    };
  },
  components: {},
});
</script>
