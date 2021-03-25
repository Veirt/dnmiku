<template>
  <header>
    <div
      class="w-full bg-center bg-cover"
      style="height: 32rem"
      :style="{ backgroundImage: `url('${banner}')` }"
      title="Dragon Nest Red Lotus"
    >
      <div
        class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
      >
        <div class="text-center">
          <h1 class="text-2xl font-semibold text-white uppercase md:text-3xl">
            DN <span class="text-red-300">Miku</span>
          </h1>
        </div>
      </div>
    </div>
  </header>
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
                  Pending
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
                  Pending
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
                  Pending
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center px-5 py-5 min-w-screen">
    <div class="w-full max-w-3xl">
      <div class="-mx-2 md:flex">
        <div class="w-full px-2 md:w-1/2">
          <div class="mb-4 rounded-lg shadow-sm">
            <div
              class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl"
            >
              <div class="relative px-3 pt-8 pb-10 text-center">
                <i class="mb-4 text-3xl fa fa-gamepad"></i>
                <h4 class="text-sm text-red-400 uppercase">Game Server</h4>
                <h3
                  class="my-3 text-3xl font-semibold leading-tight"
                  id="gameserver"
                >
                  Pending
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-2 md:w-1/2">
          <div class="mb-4 rounded-lg shadow-sm">
            <div
              class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl"
            >
              <div class="relative px-3 pt-8 pb-10 text-center">
                <i class="mb-4 text-3xl fa fa-home"></i>
                <h4 class="text-sm text-red-400 uppercase">Village Server</h4>
                <h3
                  class="my-3 text-3xl font-semibold leading-tight"
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
import banner from "../assets/images/RedLotus.jpg";

export default defineComponent({
  name: "Home",
  data() {
    return {
      banner,
    };
  },
  components: {},
});
</script>
