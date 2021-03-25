<template>
  <div
    class="flex items-center justify-center min-h-screen px-5 py-5 bg-white min-w-screen"
  >
    <div
      class="w-full overflow-hidden text-gray-500 bg-gray-100 shadow-xl"
      style="max-width: 1000px"
    >
      <div class="w-full md:flex">
        <div class="hidden w-1/2 px-10 py-10 bg-red-300 md:block">
          <!-- Image -->
          <div class="flex h-full">
            <img
              class="items-center justify-center object-scale-down"
              :src="logo"
              alt="Dragon Nest Miku Logo"
            />
          </div>
        </div>
        <div class="w-full px-5 py-10 md:w-1/2 md:px-10">
          <div class="mb-10 text-center">
            <h1 class="text-3xl font-bold text-gray-900">LOGIN</h1>
          </div>
          <div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <div
                  class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
                >
                  <span class="mr-1 text-red-400">*</span>Username
                </div>
                <div class="flex">
                  <div
                    class="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"
                  >
                    <i class="text-lg text-gray-400 mdi mdi-email-outline"></i>
                  </div>
                  <input
                    type="text"
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
                  <span class="mr-1 text-red-400">*</span>Password
                </div>
                <div class="flex">
                  <div
                    class="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"
                  >
                    <i class="text-lg text-gray-400 mdi mdi-lock-outline"></i>
                  </div>
                  <input
                    type="password"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import logo from "../assets/images/dnmiku.png";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      logo,
    };
  },
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css");
</style>
