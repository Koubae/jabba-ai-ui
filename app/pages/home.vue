<script setup>
definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <div>
    <nav class="flex items-center justify-center space-x-2 mb-6 mt-8">
        <NuxtLink to="/dashboard/application/list" class="px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-purple-600 text-white shadow-lg">
          <span class="relative z-10">Applications</span>
        </NuxtLink>
      <NuxtLink to="/dashboard/session/list" class="px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-amber-300 text-black shadow-lg">
        <span class="relative z-10">Sessions</span>
      </NuxtLink>
    </nav>
    <EffectsCoolAnimation/>
    <NuxtPage />

  </div>
</template>
