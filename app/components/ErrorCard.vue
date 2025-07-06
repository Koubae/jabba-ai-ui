<script setup lang="ts">
interface Props {
  error?: string | null
  authError?: string | null
  title?: string
  icon?: string
  showRetryButton?: boolean
  retryText?: string
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  error: null,
  authError: null,
  title: 'Error Occurred',
  icon: '❌',
  showRetryButton: true,
  retryText: 'Try Again',
  containerClass: 'min-h-[400px] p-8'
})

const emit = defineEmits<{
  retry: []
}>()

const errorMessage = computed(() => props.error || props.authError || 'An unexpected error occurred')

const handleRetry = () => {
  emit('retry')
}
</script>

<template>
  <div class="flex justify-center items-center" :class="containerClass">
    <div class="relative w-full max-w-md">
      <!-- Animated Border Gradient -->
      <div class="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-xl animate-gradient-x opacity-75 blur-sm"></div>

      <!-- Main Card Content -->
      <div class="relative bg-gray-900/95 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 shadow-2xl">
        <!-- Floating Particles Effect -->
        <div class="absolute inset-0 overflow-hidden rounded-xl">
          <div class="absolute top-2 left-4 w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
          <div class="absolute top-4 right-6 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse"></div>
          <div class="absolute bottom-3 left-8 w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
          <div class="absolute bottom-2 right-4 w-0.5 h-0.5 bg-red-400 rounded-full animate-ping"></div>
        </div>

        <!-- Header with Glow Effect -->
        <div class="relative z-10 mb-4 text-center">
          <div class="text-4xl mb-2 animate-bounce">{{ icon }}</div>
          <h3 class="text-white font-bold text-xl bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
            {{ title }}
          </h3>
          <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-orange-500/20 blur-xl animate-pulse"></div>
        </div>

        <!-- Error Message -->
        <div class="relative z-10 mb-6">
          <div class="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p class="text-red-300 text-center font-medium">
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <div v-if="showRetryButton" class="relative z-10 text-center ">
          <button
              @click="handleRetry"
              class="group px-6 py-3 cursor-pointer bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 font-medium relative overflow-hidden"
          >
            <span class="relative z-10">{{ retryText }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>

        <!-- Animated Bottom Border -->
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-b-xl animate-gradient-x"></div>
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

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}
</style>