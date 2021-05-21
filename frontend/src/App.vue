<template>
	<NavBar />
	<router-view />
</template>

<script setup lang="ts"></script>

<style>
.t-data {
	@apply px-5 py-5 text-sm text-center bg-white border-b border-gray-200;
}
.t-text {
	@apply text-gray-900 whitespace-no-wrap;
}
</style>
