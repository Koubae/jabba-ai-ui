<script setup lang="ts">
import type { User } from '~/common/interfaces'

interface Props {
  user: User
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showName: true
})

const sizeClasses = {
  sm: {
    avatar: 'w-6 h-6 text-xs',
    container: 'px-2 py-1 space-x-1',
    text: 'text-xs'
  },
  md: {
    avatar: 'w-8 h-8 text-sm',
    container: 'px-3 py-1 space-x-2',
    text: 'text-sm'
  },
  lg: {
    avatar: 'w-10 h-10 text-base',
    container: 'px-4 py-2 space-x-3',
    text: 'text-base'
  }
}

const currentSize = computed(() => sizeClasses[props.size])

const userDetails = computed(() => [
  { label: 'ID', value: props.user.id, icon: '🆔' },
  { label: 'Username', value: props.user.username, icon: '👤' },
  { label: 'Application ID', value: props.user.application_id, icon: '🔗' },
  { label: 'Created', value: new Date(props.user.created).toLocaleDateString(), icon: '📅' },
  { label: 'Updated', value: new Date(props.user.updated).toLocaleDateString(), icon: '🔄' }
])
</script>

<template>
  <div class="relative group">
    <!-- Main Avatar Component -->
    <div
        class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 cursor-pointer hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
        :class="currentSize.container"
    >
      <!-- Avatar -->
      <div
          class="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 group-hover:animate-pulse"
          :class="currentSize.avatar"
      >
        {{ user.username.charAt(0).toUpperCase() }}
      </div>

      <!-- Username (optional) -->
      <span
          v-if="showName"
          class="text-white/90 font-medium group-hover:text-white transition-colors duration-300"
          :class="currentSize.text"
      >
        {{ user.username }}
      </span>
    </div>

    <!-- Epic Floating Tooltip - NOW BELOW THE AVATAR -->
    <div
        class="absolute top-full right-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-150 z-50 transform group-hover:translate-y-0 translate-y-[-8px] group-hover:scale-100 scale-95"
    >
      <!-- Tooltip Container with Epic Effects -->
      <div class="relative">
        <!-- Animated Border Gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-xl animate-gradient-x opacity-75 blur-sm"></div>

        <!-- Main Tooltip Content -->
        <div class="relative bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl">
          <!-- Floating Particles Effect -->
          <div class="absolute inset-0 overflow-hidden rounded-xl">
            <div class="absolute top-2 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
            <div class="absolute top-4 right-6 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse"></div>
            <div class="absolute bottom-3 left-8 w-1 h-1 bg-indigo-400 rounded-full animate-bounce"></div>
            <div class="absolute bottom-2 right-4 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping"></div>
          </div>

          <!-- Header with Glow Effect -->
          <div class="relative z-10 mb-3 pb-2 border-b border-white/20">
            <h3 class="text-white font-bold text-lg bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
              ✨ User Details
            </h3>
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-xl animate-pulse"></div>
          </div>

          <!-- User Details with Staggered Animation -->
          <div class="relative z-10 space-y-2">
            <div
                v-for="(detail, index) in userDetails"
                :key="detail.label"
                class="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/item"
                :style="{ animationDelay: `${index * 50}ms` }"
            >
              <div class="flex items-center space-x-2">
                <span class="text-lg group-hover/item:scale-125 transition-transform duration-300">
                  {{ detail.icon }}
                </span>
                <span class="text-white/70 text-sm font-medium group-hover/item:text-white/90 transition-colors duration-300">
                  {{ detail.label }}
                </span>
              </div>
              <span class="text-white text-sm font-mono bg-white/10 px-2 py-1 rounded group-hover/item:bg-white/20 transition-all duration-300">
                {{ detail.value }}
              </span>
            </div>
          </div>

          <!-- Animated Bottom Border -->
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-b-xl animate-gradient-x"></div>
        </div>

        <!-- Tooltip Arrow - NOW POINTING UP -->
        <div class="absolute bottom-full right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900/95"></div>
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

/* Staggered entrance animation for details */
.group:hover .space-y-2 > div {
  animation: slideInUp 0.4s ease-out forwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>