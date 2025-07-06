<script setup lang="ts">
interface Props {
  text?: string
  containerClass?: string
}

withDefaults(defineProps<Props>(), {
  text: '',
  containerClass: 'p-8'
})
</script>

<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <!-- Outer ring -->
      <div class="w-12 h-12 rounded-full border-4 border-purple-200/20 border-t-purple-500 animate-spin"></div>

      <!-- Inner ring -->
      <div class="absolute inset-2 w-8 h-8 rounded-full border-4 border-pink-200/20 border-t-pink-500 animate-spin animate-reverse"></div>

      <!-- Center dot -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      </div>
    </div>

    <span v-if="text" class="ml-3 text-white/80 font-medium">{{ text }}</span>
  </div>
</template>

<style scoped>
.animate-reverse {
  animation-direction: reverse;
}
</style>>