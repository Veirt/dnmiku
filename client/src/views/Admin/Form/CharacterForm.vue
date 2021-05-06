<template>
  <div class="flex justify-center leading-loose">
    <form
      @submit.prevent="editCharacter(parseInt(id))"
      class="flex-col max-w-xl p-10 m-4 bg-white rounded shadow-xl"
    >
      <p class="font-bold text-gray-800">CharacterId {{ $route.params.id }}</p>
      <div class="my-2">
        <label class="block text-sm text-gray-600" for="AccountName"
          >Character Name</label
        >
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none focus:placeholder-gray-500"
          id="AccountName"
          v-model="character.CharacterName"
          type="text"
          placeholder="Character Name"
        />
      </div>

      <div class="flex flex-row my-2">
        <div class="flex flex-col w-1/2 mr-1">
          <label class="block text-sm text-gray-600" for="CharacterLevel"
            >Character Level</label
          >
          <input
            class="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded outline-none"
            id="CharacterLevel"
            v-model="character.CharacterStatus.CharacterLevel"
            type="number"
            placeholder="Character Level"
          />
        </div>
        <div class="flex flex-col w-1/2 ml-1">
          <label class="block text-sm text-gray-600" for="SkillPoint"
            >Skill Point</label
          >
          <input
            class="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded outline-none"
            id="SkillPoint"
            v-model="character.CharacterStatus.SkillPoint"
            type="number"
            placeholder="Skill Point"
          />
        </div>
      </div>

      <div class="my-2">
        <label class="block text-sm text-gray-600" for="LikeCount">Like</label>
        <input
          class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded outline-none focus:placeholder-gray-500"
          id="LikeCount"
          v-model="character.CharacterStatus.LikeCount"
          type="number"
          placeholder="Like Count"
        />
      </div>

      <div class="mt-4">
        <button
          class="px-4 py-1 tracking-wider text-white transition delay-100 bg-gray-900 rounded hover:text-red-300"
          type="submit"
        >
          Edit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  character,
  getCharacterById,
  editCharacter,
} from "../../../composables/characterEndpoints";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;

if (route.params.id) {
  getCharacterById(parseInt(id));
}
</script>
