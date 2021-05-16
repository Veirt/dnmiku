<template>
	<div class="flex justify-center md:mx-15">
		<div class="flex flex-col justify-center w-1/3 text-center mx-13 mt-15">
			<div
				class="px-3 py-4 mx-5 my-5 text-white transition duration-300 transform bg-black border rounded-md shadow-md hover:text-red-300 hover:-translate-y-1"
			>
				<div class="flex flex-row duration-300 ">
					<router-link
						:to="{ path: '/admin/accounts' }"
						class="w-full font-semibold uppercase"
						>Manage Accounts</router-link
					>
				</div>
			</div>
			<div
				class="px-3 py-4 mx-5 my-5 text-white transition duration-300 transform bg-black border rounded-md shadow-md hover:text-red-300 hover:-translate-y-1"
			>
				<div class="flex flex-row duration-300 ">
					<router-link
						:to="{ path: '/admin/characters' }"
						class="w-full font-semibold uppercase"
						>Manage Characters</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()
document.title = route.meta.title as string
</script>
