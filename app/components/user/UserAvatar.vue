
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

// Size configurations
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
</script>

<template>
  <div
      class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
      :class="currentSize.container"
  >
    <!-- Avatar -->
    <div
        class="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold"
        :class="currentSize.avatar"
    >
      {{ user.username.charAt(0).toUpperCase() }}
    </div>

    <!-- Username (optional) -->
    <span
        v-if="showName"
        class="text-white/90 font-medium"
        :class="currentSize.text"
    >
      {{ user.username }}
    </span>
  </div>
</template>