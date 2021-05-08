<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
document.title = route.meta.title as string;
</script>
