<script setup lang="ts">

</script>

<template>
  <img
      src="/assets/images/jabba.jpg"
      alt="Jabba"
      class="w-32 h-32 rounded-full object-cover animate-jabba-chaos fixed z-50"
  >

</template>

<style scoped>
@keyframes jabba-chaos {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  5% {
    transform: translate(80vw, 10vh) rotate(45deg);
  }
  10% {
    transform: translate(20vw, 80vh) rotate(120deg);
  }
  15% {
    transform: translate(90vw, 60vh) rotate(200deg);
  }
  20% {
    transform: translate(10vw, 20vh) rotate(300deg);
  }
  25% {
    transform: translate(70vw, 90vh) rotate(180deg);
  }
  30% {
    transform: translate(30vw, 5vh) rotate(270deg);
  }
  35% {
    transform: translate(95vw, 40vh) rotate(90deg);
  }
  40% {
    transform: translate(5vw, 70vh) rotate(360deg);
  }
  45% {
    transform: translate(60vw, 15vh) rotate(450deg);
  }
  50% {
    transform: translate(85vw, 85vh) rotate(540deg);
  }
  55% {
    transform: translate(15vw, 50vh) rotate(630deg);
  }
  60% {
    transform: translate(75vw, 25vh) rotate(720deg);
  }
  65% {
    transform: translate(40vw, 95vh) rotate(810deg);
  }
  70% {
    transform: translate(90vw, 30vh) rotate(900deg);
  }
  75% {
    transform: translate(25vw, 75vh) rotate(990deg);
  }
  80% {
    transform: translate(65vw, 10vh) rotate(1080deg);
  }
  85% {
    transform: translate(10vw, 60vh) rotate(1170deg);
  }
  90% {
    transform: translate(80vw, 80vh) rotate(1260deg);
  }
  95% {
    transform: translate(50vw, 35vh) rotate(1350deg);
  }
  100% {
    transform: translate(0, 0) rotate(1440deg);
  }
}

.animate-jabba-chaos {
  animation: jabba-chaos 20s infinite ease-in-out;
}
</style>