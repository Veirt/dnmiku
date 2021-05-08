<template>
  <CharacterTable />
</template>

<script setup lang="ts">
import CharacterTable from "@/components/Tables/CharacterTable.vue";
import { useRoute } from "vue-router";

const route = useRoute();
document.title = route.meta.title as string;
</script>
