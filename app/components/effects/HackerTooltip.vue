<script setup lang="ts">
interface Props {
  visible: boolean;
  data: any;
  title?: string;
  systemMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'MESSAGE.DEBUG',
  systemMessage: 'ACCESSING DATA STREAM...'
});

const tooltipPosition = ref({ x: 0, y: 0 });

const tooltipStyles = computed(() => {
  return {
    left: `${tooltipPosition.value.x}px`,
    top: `${tooltipPosition.value.y}px`,
    transform: 'translate(-50%, -50%)',
  };
});

// Center the tooltip when it becomes visible
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    tooltipPosition.value = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }
});

const dataInfo = computed(() => {
  if (!props.data) return { fields: 0, bytes: 0 };

  return {
    fields: Object.keys(props.data).length,
    bytes: JSON.stringify(props.data).length
  };
});

const currentTime = computed(() => {
  return new Date().toLocaleTimeString();
});
</script>

<template>
  <Teleport to="body">
    <div
        v-if="visible && data"
        class="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out"
        :style="tooltipStyles"
    >
      <!-- Backdrop blur overlay -->
      <div class="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"></div>

      <!-- Main tooltip container -->
      <div class="relative bg-black/95 border-2 border-green-500/50 rounded-lg shadow-2xl shadow-green-500/20 min-w-[400px] max-w-[700px] max-h-[500px] overflow-hidden">
        <!-- Animated border glow -->
        <div class="absolute inset-0 border-2 border-green-400/30 rounded-lg animate-pulse"></div>

        <!-- Header -->
        <div class="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-b border-green-500/30 p-3">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-400 font-mono text-sm font-bold">{{ title }}</span>
            <div class="flex-1"></div>
            <span class="text-green-300/70 font-mono text-xs">
              {{ currentTime }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 font-mono text-sm">
          <!-- System info bar -->
          <div class="flex items-center gap-2 mb-3 text-green-300/70 text-xs">
            <span class="bg-green-500/20 px-2 py-1 rounded">SYS</span>
            <span>{{ systemMessage }}</span>
            <div class="flex gap-1">
              <div class="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
              <div class="w-1 h-1 bg-green-400 rounded-full animate-ping animation-delay-100"></div>
              <div class="w-1 h-1 bg-green-400 rounded-full animate-ping animation-delay-200"></div>
            </div>
          </div>

          <!-- JSON content -->
          <div class="bg-black/50 border border-green-500/30 rounded p-3 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
            <pre class="text-green-400 text-xs leading-relaxed whitespace-pre-wrap">{{ JSON.stringify(data, null, 2) }}</pre>
          </div>

          <!-- Footer info -->
          <div class="flex items-center justify-between mt-3 text-green-300/50 text-xs">
            <span>{{ dataInfo.fields }} FIELDS</span>
            <span>{{ dataInfo.bytes }} BYTES</span>
            <span class="flex items-center gap-1">
              <div class="w-1 h-1 bg-green-400 rounded-full"></div>
              SECURE
            </span>
          </div>
        </div>

        <!-- Corner accents -->
        <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400/60"></div>
        <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400/60"></div>
        <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400/60"></div>
        <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400/60"></div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Custom animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

/* Custom scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-green-500\/30::-webkit-scrollbar-thumb {
  background-color: rgba(34, 197, 94, 0.3);
  border-radius: 0.25rem;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
</style>