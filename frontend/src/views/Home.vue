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

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import banner from "@/assets/images/RedLotus.jpg";
import logo from "@/assets/images/dnmiku-white.png";
import { useRoute } from "vue-router";

const route = useRoute();
document.title = route.meta.title as string;

const PlayerStats = defineAsyncComponent(() =>
  import("@/components/Stats/PlayerStats.vue")
);
const ServerStats = defineAsyncComponent(() =>
  import("@/components/Stats/ServerStats.vue")
);
</script>
