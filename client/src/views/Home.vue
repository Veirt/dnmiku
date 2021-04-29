<template>
  <header>
    <div
      class="w-full bg-center bg-cover"
      :style="{ height: 32 + 'rem', backgroundImage: `url('${banner}')` }"
      title="Dragon Nest Red Lotus"
    >
      <div
        class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
      >
        <img class="w-1/2" :src="logo" alt="Dragon Nest Miku Logo" />
      </div>
    </div>
  </header>

  <PlayerStats />
  <ServerStats />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerStats from "../components/Stats/PlayerStats.vue";
import ServerStats from "../components/Stats/ServerStats.vue";
import banner from "../assets/images/RedLotus.jpg";
import logo from "../assets/images/dnmiku-white.png";

export default defineComponent({
  name: "Home",
  components: {
    PlayerStats,
    ServerStats,
  },
  data() {
    return {
      banner,
      logo,
    };
  },
  created() {
    document.title = this.$route.meta.title as string;
  },
});
</script>

<style src="../assets/css/all.css"></style>
