<template>
  <section class="relative overflow-hidden py-20 sm:py-32 min-h-[85vh]">
    <EffectsCoolAnimation/>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Main Heading with animated gradient -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
            Welcome to
          </span>
          <br>
          <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] animation-delay-1000">
            Jabba AI
          </span>
        </h1>

        <!-- Subtitle with subtle glow animation -->
        <p class="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed animate-pulse-slow">
          The dumbest AI you'll ever see!
        </p>

        <!-- CTA Buttons with enhanced hover effects -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink
              to="/auth/signup"
              class="group px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-2 hover:scale-110 animate-gradient-x bg-[length:200%_200%] relative overflow-hidden"
          >
            <span class="relative z-10">🚀 Signup</span>
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </NuxtLink>
          <NuxtLink
              to="/auth/login"
              class="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/25 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
          >
            <span class="relative z-10">🔑 Sign In</span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
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
    transform: translate(30px, -50px) scale(1.5);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.3);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
<script setup lang="ts">
</script>