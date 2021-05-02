<template></template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Admin",
  created() {
    document.title = this.$route.meta.title as string;
  },
});
</script>
