<template>
	<div class="px-6 py-10 w-full md:py-16">
		<div
			class="flex flex-col space-y-6 md:flex-row md:items-center md:space-x-6"
		>
			<div
				v-show="done"
				class="flex flex-row w-full md:w-1/2 bg-gray-100 rounded shadow-md px-3 py-2 "
			>
				<div
					v-if="account.Avatar"
					class="flex md:w-48 w-30 h-auto justify-center items-center m-1 text-xl rounded-full text-white"
				>
					<img
						class="rounded-full"
						alt="Discord Avatar"
						:src="
							`https://cdn.discordapp.com/avatars/${account.DiscordID}/${account.Avatar}.png?size=4096`
						"
					/>
				</div>
				<div class="flex flex-row w-full ml-5 md:ml-10">
					<div class="text-1xl py-2 flex flex-col w-1/2">
						<h1 class="font-bold text-md md:text-3xl uppercase tracking-wide">
							{{ account.AccountName }}
						</h1>
						<h1 class="font-light text-sm md:text-lg">{{ account.Email }}</h1>
						<div class="mt-3">
							<h1 class="font-semibold text-1xl">Cash</h1>
							<h1 class="font-light text-md">{{ account.cash }}</h1>
						</div>
						<div class="mt-3">
							<h1 class="font-semibold text-1xl">Last Active</h1>
							<h1 class="font-light text-md">
								{{
									account.LastLoginDate
										? store.getters.dayjs(account.LastLoginDate)
										: "-"
								}}
							</h1>
						</div>
					</div>
					<div
						v-if="!account.DiscordID"
						class="flex flex-col w-1/2 items-center justify-center "
					>
						<div class="flex flex-col items-center justify-center">
							<a
								:href="`${store.getters.getApiUrl}/api/v1/oauth/discord`"
								class="md:px-3 px-1 py-1 md:py-4 text-sm font-bold text-center text-white uppercase transition duration-200 rounded-md discord"
							>
								Connect Discord
								<i class="ml-2 fab fa-discord"></i>
							</a>
						</div>
						<p
							v-if="route.query.e === 'discord'"
							class="mt-2 text-sm text-center text-red-500"
						>
							Your discord is already associated
						</p>
					</div>
				</div>
			</div>
			<div class="flex items-center justify-center w-full md:w-1/2">
				<div class="flex flex-col bg-gray-100"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { account, getMyAccount } from "../composables/account.api"
import { ref } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

const done = ref(false)

const store = useStore()
const route = useRoute()
getMyAccount().then(() => (done.value = true))
</script>

<style scoped>
.discord {
	background: #8c95c9;
}

.discord:hover {
	background: #a8b3ee;
}
</style>
