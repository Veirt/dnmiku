<template>
  <div class="max-w-6xl p-12 mx-auto">
    <div class="flex flex-col justify-center md:flex-row">
      <div class="flex flex-col justify-center max-w-md md:w-1/2">
        <div class="text-xl font-black uppercase md:text-4xl">
          <img :src="logo" alt="Dragon Nest Miku Logo" />
        </div>
      </div>
      <div class="flex justify-start w-full mt-5 md:w-1/2 md:justify-end">
        <div class="flex-auto max-w-sm p-10 pb-20 bg-white shadow-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegisterForm from "@/components/RegisterForm.vue";
import logo from "@/assets/images/dnmiku-black.png";

export default defineComponent({
  name: "Register",
  components: { RegisterForm },
  data() {
    return {
      logo,
    };
  },
  created() {
    document.title = this.$route.meta.title as string;
  },
});
</script>
