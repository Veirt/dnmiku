<template>
  <RegisterForm />
</template>

<script>
import { defineComponent } from "vue";
import RegisterForm from "../components/RegisterForm.vue";

export default defineComponent({
  name: "Register",
  components: { RegisterForm },
});
</script>
