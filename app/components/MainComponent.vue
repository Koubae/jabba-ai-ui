<script setup lang="ts">
import { redirectToIndexPage } from "~/common/redirects";

const { isAuthenticated, logout } = useAuth()
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Animated Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 animate-gradient-x"></div>

    <!-- Moving color orbs for ambient effect -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow"></div>
    <div class="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow animation-delay-3000"></div>
    <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-yellow-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow animation-delay-6000"></div>

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

    <!-- Main Content -->
    <main class="min-h-[85vh] flex-1 relative z-10">
      <NuxtPage />
    </main>

    <!-- Footer with animated effects -->
    <footer class="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-auto relative z-10">
      <!-- Animated top border -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-gradient-x"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-white/60 text-sm">
          <p class="hover:text-white/80 transition-colors duration-300 animate-pulse-slow">
            © 2025 Jabba AI. By Federico Bau
          </p>
          <p class="hover:text-white/80 transition-colors duration-300 animate-pulse-slow">
            <a  href="https://federicobau.dev/" target="_blank">federicobau.dev</a>
          </p>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes blob-slow {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  25% {
    transform: translate(20px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-15px, 15px) scale(0.95);
  }
  75% {
    transform: translate(10px, -20px) scale(1.02);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-gradient-x {
  animation: gradient-x 4s ease infinite;
}

.animate-blob-slow {
  animation: blob-slow 12s infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

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