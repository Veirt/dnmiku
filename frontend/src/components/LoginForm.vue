<template>
	<form @submit.prevent="login">
		<div class="flex -mx-3">
			<div class="w-full px-3 mb-5">
				<div
					class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
				>
					<label for="AccountName" class="mr-1 text-red-400">*</label>Username
				</div>
				<div class="flex">
					<div
						class="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"
					>
						<i class="text-lg text-gray-400 mdi mdi-email-outline"></i>
					</div>
					<input
						v-model="account.AccountName"
						type="text"
						id="AccountName"
						class="w-full py-2 pl-10 pr-3 -ml-10 bg-gray-100 border-b-2 border-red-300 outline-none"
						placeholder="Username"
					/>
				</div>
			</div>
		</div>
		<div class="flex -mx-3">
			<div class="w-full px-3 mb-12">
				<div
					class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"
				>
					<label for="Password" class="mr-1 text-red-400">*</label>Password
				</div>
				<div class="flex">
					<div
						class="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"
					>
						<i class="text-lg text-gray-400 mdi mdi-lock-outline"></i>
					</div>
					<input
						v-model="account.Password"
						type="password"
						id="Password"
						class="w-full py-2 pl-10 pr-3 -ml-10 bg-gray-100 border-b-2 border-red-300 outline-none"
						placeholder="Password"
					/>
				</div>
			</div>
		</div>
		<div class="flex -mx-3">
			<div class="w-full px-3 mb-5">
				<button
					type="submit"
					class="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-white transition duration-200 bg-black rounded-md hover:text-red-300 focus:text-red-300"
				>
					LOGIN
				</button>
			</div>
		</div>
		<div class="flex flex-col items-center justify-center px-12">
			<a
				:href="`${store.getters.getApiUrl}/api/v1/oauth/discord`"
				class="px-3 py-2 text-sm font-bold text-center text-transparent text-white uppercase transition duration-200 rounded-md discord"
			>
				Login using Discord
				<i class="ml-2 fab fa-discord"></i>
			</a>
			<p
				v-if="route.query.e === 'discord'"
				class="mt-2 text-sm text-center text-red-500"
			>
				Your discord is not associated with any account
			</p>
		</div>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import axios from "../api/axios"

const store = useStore()
const route = useRoute()
const router = useRouter()

const account = ref({
	AccountName: "",
	Password: "",
})

const login = async () => {
	try {
		const res = await axios({
			method: "POST",
			url: "auth/local",
			withCredentials: true,
			data: account.value,
		})

		store.dispatch("setAuthStatus", {
			token: res.data.token,
			role: res.data.account.role,
		})
		router.replace("/profile")
	} catch (err) {
		alert(err)
	}
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css");

.discord {
	background: #8c95c9;
}

.discord:hover {
	background: #a8b3ee;
}
</style>
