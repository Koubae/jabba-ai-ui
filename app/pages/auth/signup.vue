<script setup>
import { ref } from 'vue'
import {redirectToLoginPage} from "~/common/redirects.js";

const applicationID = ref()
const username = ref()
const password = ref()

const { signup, loading, error } = useSignup()

async function submitSignup() {
  const result = await signup(applicationID.value, username.value, password.value)
  if (result) {
    await redirectToLoginPage()
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Animated Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-indigo-900/30 animate-gradient-x"></div>

    <!-- Moving color orbs -->
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div class="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-pink-400/40 to-yellow-400/40 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>

    <!-- Signup Form Container -->
    <div class="relative z-10 w-full max-w-md">
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        <!-- Animated border gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 animate-gradient-x opacity-50 rounded-2xl"></div>

        <!-- Content -->
        <div class="relative z-10">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] mb-2">
              🚀 Join Jabba AI
            </h2>
            <p class="text-white/70 text-sm animate-pulse-slow">
              Create your account to talk with Jabba AI!
            </p>
          </div>

          <!-- Loading Spinner -->
          <EffectsLoadingSpinner
              v-if="loading"
              text="Creating your account..."
              container-class="min-h-[300px]"
          />

          <!-- Signup Form -->
          <form v-else @submit.prevent="submitSignup" class="space-y-6">
            <!-- Application ID Input -->
            <div class="relative group">
              <input
                  v-model="applicationID"
                  type="text"
                  placeholder="Application ID"
                  required
                  class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15 focus:bg-white/15"
              />
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <!-- Username Input -->
            <div class="relative group">
              <input
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  required
                  class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15 focus:bg-white/15"
              />
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <!-- Password Input -->
            <div class="relative group">
              <input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  required
                  class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15 focus:bg-white/15"
              />
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                :disabled="loading"
                class="group w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-gradient-x bg-[length:200%_200%] font-semibold relative overflow-hidden"
            >
              <span class="relative z-10">✨ Create Account</span>
              <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>

            <!-- Error Message -->
            <Transition name="error-fade">
              <div v-if="error" class="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-3 text-red-200 text-sm text-center animate-pulse">
                {{ error }}
              </div>
            </Transition>
          </form>

          <!-- Login Link -->
          <div class="mt-8 text-center">
            <p class="text-white/70 text-sm">
              Already have an account?
              <NuxtLink
                  to="/auth/login"
                  class="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-purple-300 hover:to-pink-300 transition-all duration-300 font-semibold ml-1 hover:underline"
              >
                Login here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
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

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.animate-gradient-x {
  animation: gradient-x 4s ease infinite;
}

.animate-blob {
  animation: blob 8s infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Error message animations */
.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>