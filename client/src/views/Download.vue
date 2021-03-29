<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Download",
  created() {
    document.title = this.$route.meta.title as string;
  },
});
</script>
