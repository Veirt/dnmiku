<template>
  <AccountTable />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccountTable from "../../components/Tables/AccountTable.vue";

export default defineComponent({
  name: "ManageAccounts",
  components: { AccountTable },
  setup() {},
});
</script>
