<script setup lang="ts">
import { redirectToIndexPage } from "~/common/redirects";

const { isAuthenticated, logout } = useAuth()
</script>

<template>
  <header class="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 relative">
    <!-- Animated border gradient -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 animate-gradient-x opacity-50"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex justify-between items-center py-4">
        <!-- Logo with enhanced animation -->
        <div
            @click="redirectToIndexPage()"
            class="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300 animate-gradient-x bg-[length:200%_200%] transform hover:-translate-y-1 hover:drop-shadow-lg"
        >
          🤖 Jabba AI
        </div>

        <!-- Navigation with enhanced effects -->
        <nav class="flex items-center space-x-4">
          <Transition name="fade" mode="out-in">
            <!-- Not authenticated -->
            <div v-if="!isAuthenticated" key="public" class="flex items-center space-x-3">
              <NuxtLink
                  to="/auth/login"
                  class="group px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30 transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden"
              >
                <span class="relative z-10">Login</span>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </NuxtLink>
              <NuxtLink
                  to="/auth/signup"
                  class="group px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-gradient-x bg-[length:200%_200%] relative overflow-hidden"
              >
                <span class="relative z-10">Signup</span>
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </NuxtLink>
            </div>

            <!-- Authenticated -->
            <div v-else key="private" class="flex items-center space-x-3">
              <NuxtLink
                  to="/home"
                  class="group px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30 transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden"
              >
                <span class="relative z-10">🏠 Home</span>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </NuxtLink>
              <button
                  @click="logout"
                  class="group px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
              >
                <span class="relative z-10">Logout</span>
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>
          </Transition>
        </nav>
      </div>
    </div>
  </header>
</template>
