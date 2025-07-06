<template>
<div>
  <!-- Animated Background Effects -->
  <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 animate-gradient-x"></div>

  <!-- Moving color orbs for ambient effect -->
  <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow "></div>
  <div class="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow animation-delay-3000"></div>
  <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-yellow-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-slow animation-delay-6000"></div>

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