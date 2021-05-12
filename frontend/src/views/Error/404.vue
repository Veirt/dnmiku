<template>
  <div class="flex items-center w-screen h-screen bg-white">
    <div
      class="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row"
    >
      <div class="max-w-md">
        <div class="text-5xl font-bold font-dark">404</div>
        <p class="text-2xl font-light leading-normal md:text-3xl">
          Sorry we couldn&apos;t find this page.
        </p>
        <p class="mb-8"></p>
        <router-link
          class="inline px-4 py-2 text-sm font-medium leading-5 text-white transition ease-in-out delay-100 bg-black border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue hover:text-red-300"
          to="/"
        >
          Back to homepage</router-link
        >
      </div>
      <div class="max-w-md"></div>
    </div>
  </div>
</template>
