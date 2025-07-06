<script setup lang="ts">
import { redirectToIndexPage } from "~/common/redirects";

const { isAuthenticated, logout } = useAuth()
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <header class="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo -->
          <div
              @click="redirectToIndexPage()"
              class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            🤖 Jabba AI
          </div>

          <!-- Navigation -->
          <nav class="flex items-center space-x-4">
            <Transition name="fade" mode="out-in">
              <!-- Not authenticated -->
              <div v-if="!isAuthenticated" key="public" class="flex items-center space-x-3">
                <NuxtLink
                    to="/auth/login"
                    class="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm"
                >
                  Login
                </NuxtLink>
                <NuxtLink
                    to="/auth/signup"
                    class="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Signup
                </NuxtLink>
              </div>

              <!-- Authenticated -->
              <div v-else key="private" class="flex items-center space-x-3">
                <NuxtLink
                    to="/home"
                    class="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm"
                >
                  🏠 Home
                </NuxtLink>
                <button
                    @click="logout"
                    class="px-4 py-2 text-sm font-medium bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            </Transition>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="min-h-[85vh] flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-white/60 text-sm">
          <p>© 2025 Jabba AI. Powered by AI Innovation.</p>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
