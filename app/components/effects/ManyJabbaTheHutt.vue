<script setup>
const jabbas = ref([])
let jabbaId = 0

const spawnJabba = () => {
  // Check if we're in the browser
  if (typeof window === 'undefined') return

  const newJabba = {
    id: jabbaId++,
    image: '/images/jabba.jpg',
    alt: '🐸',
    size: Math.random() * 80 + 60, // Random size between 60px and 140px
    startX: Math.random() * (window.innerWidth - 200),
    startY: Math.random() * (window.innerHeight - 200),
    duration: Math.random() * 15 + 20, // Random duration between 20-35 seconds
    lifespan: Math.random() * 8000 + 12000 // Lives for 12-20 seconds
  }

  jabbas.value.push(newJabba)

  // Remove this jabba after its lifespan
  setTimeout(() => {
    const index = jabbas.value.findIndex(j => j.id === newJabba.id)
    if (index > -1) {
      jabbas.value.splice(index, 1)
    }
  }, newJabba.lifespan)
}

let spawnInterval

onMounted(() => {
  // Spawn a jabba every 10 seconds
  spawnInterval = setInterval(spawnJabba, 10000)

  // Spawn first one immediately
  spawnJabba()
})

onUnmounted(() => {
  if (spawnInterval) {
    clearInterval(spawnInterval)
  }
})
</script>

<template>
  <div class="jabba-spawner">
    <div
        v-for="jabba in jabbas"
        :key="jabba.id"
        class="jabba-floating fixed z-50 rounded-full object-cover"
        :style="{
          width: jabba.size + 'px',
          height: jabba.size + 'px',
          left: jabba.startX + 'px',
          top: jabba.startY + 'px',
          animationDuration: jabba.duration + 's'
        }"
    >
      <img
          :src="jabba.image"
          :alt="jabba.alt"
          class="w-full h-full rounded-full object-cover"
      />
    </div>
  </div>
</template>

<style scoped>
.jabba-floating {
  animation: jabba-gentle 30s infinite ease-in-out;
  opacity: 1;
  animation-fill-mode: forwards;
}

@keyframes jabba-gentle {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  10% {
    transform: translate(50px, 30px) rotate(20deg);
    opacity: 1;
  }
  20% {
    transform: translate(-30px, 60px) rotate(-15deg);
    opacity: 1;
  }
  30% {
    transform: translate(80px, -20px) rotate(30deg);
    opacity: 1;
  }
  40% {
    transform: translate(-60px, 40px) rotate(-25deg);
    opacity: 1;
  }
  50% {
    transform: translate(40px, 80px) rotate(10deg);
    opacity: 1;
  }
  60% {
    transform: translate(-40px, -50px) rotate(-20deg);
    opacity: 1;
  }
  70% {
    transform: translate(70px, 20px) rotate(25deg);
    opacity: 1;
  }
  80% {
    transform: translate(-20px, 70px) rotate(-10deg);
    opacity: 1;
  }
  90% {
    transform: translate(30px, -40px) rotate(15deg);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
}
</style>