<template>
  <div class="max-w-6xl p-12 mx-auto">
    <div class="flex flex-col justify-center md:flex-row">
      <div class="flex flex-col justify-center max-w-md md:w-1/2">
        <div class="text-xl font-black uppercase md:text-4xl">
          <img v-bind:src="logo" alt="Dragon Nest Miku Logo" />
        </div>
      </div>
      <div class="flex justify-start w-full mt-5 md:w-1/2 md:justify-end">
        <div class="flex-auto max-w-sm p-10 pb-20 bg-white shadow-md">
          <form>
            <div class="w-full">
              <div
                class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
              >
                <span class="mr-1 text-red-400">*</span>Username
              </div>
              <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
                <input
                  class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
                  placeholder="Username"
                  required=""
                />
              </div>
              <p class="text-xs text-right text-red-500"></p>
            </div>
            <div class="w-full">
              <div
                class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
              >
                <span class="mr-1 text-red-400">*</span> Email
              </div>
              <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
                <input
                  class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
                  placeholder="Email"
                  required=""
                />
              </div>
              <p class="text-xs text-right text-red-500"></p>
            </div>
            <div class="w-full">
              <div
                class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
              >
                <span class="mr-1 text-red-400">*</span>Password
              </div>
              <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
                <input
                  class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
                  placeholder="Password"
                  type="password"
                  required=""
                  autocomplete="off"
                />
              </div>
              <p class="text-xs text-right text-red-500"></p>
            </div>
            <div class="w-full">
              <div
                class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
              >
                <span class="mr-1 text-red-400">*</span> Repeat Password
              </div>
              <div class="flex p-1 my-2 bg-white border-b-2 border-red-300">
                <input
                  class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
                  placeholder="Repeat your password"
                  type="password"
                  required=""
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import logo from "../assets/images/dnmiku.png";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      logo,
    };
  },
});
</script>
