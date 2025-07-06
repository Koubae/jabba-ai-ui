<template>
  <section class="relative overflow-hidden py-20 sm:py-32 min-h-[85vh]">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Main Heading -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Welcome to
          </span>
          <br>
          <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Jabba AI
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          The dumbest AI you'll ever see!
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink
              to="/auth/signup"
              class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105"
          >
            🚀 Signup
          </NuxtLink>
          <NuxtLink
              to="/auth/login"
              class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            🔑 Sign In
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>
<script setup lang="ts">
</script>