<template>
	<nav v-show="store.getters.getAuthCheck" class="px-8 pt-2 bg-black shadow-md">
		<div class="flex justify-center -mb-px">
			<router-link :to="{ name: 'Home' }" class="nav-item">Home</router-link>
			<router-link :to="{ name: 'Download' }" class="nav-item"
				>Download</router-link
			>
			<router-link
				:to="{ name: 'Profile' }"
				v-if="store.getters.getAccessToken"
				class="nav-item"
				>Profile</router-link
			>
			<router-link
				:to="{ name: 'Admin' }"
				v-if="store.getters.isAdmin"
				class="nav-item"
				>Admin</router-link
			>
			<router-link
				:to="{ name: 'Register' }"
				v-if="!store.getters.getAccessToken"
				class="nav-item"
				>Register</router-link
			>
			<router-link
				:to="{ name: 'Login' }"
				v-if="!store.getters.getAccessToken"
				class="nav-item"
				>Login</router-link
			>
			<a @click="logOut" v-if="store.getters.getAccessToken" class="nav-item"
				>Logout</a
			>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const logOut = () => {
	document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
	store.commit("LOG_OUT")
	router.replace("/")
}
</script>

<style scoped>
.nav-item {
	@apply py-3 mr-8 text-xs font-bold tracking-wide text-white no-underline uppercase transition duration-200 ease-in-out hover:text-red-300;
}
.router-link-active {
	color: #fca5a5;
	border-bottom-width: 2px;
	border-color: #fca5a5;
}
</style>
