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
          <div class="flex h-full">
            <!-- Image -->
          </div>
        </div>
        <div class="w-full px-5 py-10 md:w-1/2 md:px-10">
          <div class="mb-10 text-center">
            <h1 class="text-3xl font-bold text-gray-900">LOGIN</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "../components/LoginForm.vue";
import logo from "../assets/images/dnmiku-black.png";

export default defineComponent({
  name: "Login",
  components: { LoginForm },
  data() {
    return {
      logo,
    };
  },
});
</script>
