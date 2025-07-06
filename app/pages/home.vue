<script setup>
definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <div>
    <nav class="flex items-center justify-center space-x-2 mb-6 mt-8">
        <NuxtLink to="/dashboard/applications" class="px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-purple-600 text-white shadow-lg">
          <span class="relative z-10">Applications</span>
        </NuxtLink>
    </nav>

    <NuxtPage />

  </div>
</template>
