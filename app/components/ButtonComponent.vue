<template>
  <button
      :class="buttonClasses"
      :disabled="disabled || loading"
      @click="$emit('click')"
  >
    <LoadingSpinner v-if="loading" text="" container-class="p-0" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false
})

const buttonClasses = computed(() => {
  const base = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50'

  switch (props.variant) {
    case 'primary':
      return `${base} bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
    case 'secondary':
      return `${base} bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 hover:border-white/40`
    case 'danger':
      return `${base} bg-red-500/80 hover:bg-red-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
    default:
      return base
  }
})
</script>