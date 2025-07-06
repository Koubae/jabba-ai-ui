<script setup lang="ts">

</script>

<template>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
    <img
        src="/assets/images/jabba.jpg"
        alt="Jabba"
        class="130 h-130 rounded-full object-cover animate-jabba-chaos "
    >
  </div>

</template>

<style scoped>
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
    animation-timing-function: ease-in;
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: ease-out;
  }
  75% {
    transform: rotate(270deg);
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 4s infinite;
}

</style>