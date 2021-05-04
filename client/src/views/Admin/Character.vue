<template>
  <CharacterTable />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharacterTable from "../../components/Tables/CharacterTable.vue";

export default defineComponent({
  name: "ManageCharacters",
  components: { CharacterTable },
});
</script>
