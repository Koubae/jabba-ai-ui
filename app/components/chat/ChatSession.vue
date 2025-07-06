<script setup lang="ts">
import type { SessionConnection } from "~/common/interfaces";
import { useWebSocketChat } from "~/composables/useWebSocketChat";

interface Props {
  sessionConnection: SessionConnection;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const messageInput = ref('');
const messagesContainer = ref<HTMLElement>();

const { messages, isConnected, connect, sendMessage, disconnect } = useWebSocketChat(props.sessionConnection);

const handleSendMessage = () => {
  if (!messageInput.value.trim() || !isConnected.value) return;

  sendMessage(messageInput.value.trim());
  messageInput.value = '';
};

const router = useRouter()
const goBack = () => {
  router.push('/dashboard/session/list')
}

const formatTime = (timestamp: string): string => {
  // Handle both string timestamps and numeric timestamps
  const date = typeof timestamp === 'string' && timestamp.includes('-')
      ? new Date(timestamp)
      : new Date(parseInt(timestamp) * 1000); // Convert Unix timestamp to milliseconds

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// tooltip - Fixed implementation
const activeTooltip = ref<string | null>(null);
const tooltipPosition = ref({ x: 0, y: 0 });
const activeMessage = ref<any>(null);

const showTooltip = (message: any, event: MouseEvent) => {
  // Position tooltip in the center of the viewport
  tooltipPosition.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
  activeTooltip.value = `${message.session_id}-${message.timestamp}-${message.member_id}`;
  activeMessage.value = message;
};

const hideTooltip = () => {
  activeTooltip.value = null;
  activeMessage.value = null;
};

const tooltipStyles = computed(() => {
  return {
    left: `${tooltipPosition.value.x}px`,
    top: `${tooltipPosition.value.y}px`,
    transform: 'translate(-50%, -50%)',
  };
});


const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// Auto-scroll when new messages arrive
watch(messages, () => {
  scrollToBottom();
}, { flush: 'post', deep: true });

// Connect on mount
onMounted(() => {
  connect();
});

// Disconnect on unmount
onUnmounted(() => {
  disconnect();
});
</script>

<template>
  <div class="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
    <!-- Chat Header -->
    <div class="bg-gray-800 p-3 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-white font-semibold text-sm">{{ sessionConnection.name }}</h3>
          <p class="text-gray-400 text-xs">Session ID: {{ sessionConnection.id }}</p>
        </div>
        <div class="flex items-center gap-2">
          <button
              @click="goBack"
              class="px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors"
          >
            ← Back to Sessions
          </button>
          <div class="flex items-center gap-2">
            <div
                :class="[
                'w-2 h-2 rounded-full',
                isConnected ? 'bg-green-500' : 'bg-red-500'
              ]"
            ></div>
            <span class="text-xs text-gray-400">
              {{ isConnected ? 'Connected' : 'Disconnected' }}
            </span>
          </div>
          <button
              @click="emit('close')"
              class="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Messages Area -->
    <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-3 space-y-3 scroll-smooth"
    >
      <div
          v-for="(message, _) in messages"
          :key="`${message.session_id}-${message.timestamp}-${message.member_id}`"
          :class="[
          'flex relative group',
          message.role === 'user' ? 'justify-end' : 'justify-start'
        ]"
      >
        <div class="max-w-xs lg:max-w-md relative">
          <!-- Message Header -->
          <div
              :class="[
              'text-xs text-gray-400 mb-1',
              message.role === 'user' ? 'text-right' : 'text-left'
            ]"
          >
            <span class="font-medium text-xs">{{ message.role }}</span>
            <span class="mx-1">•</span>
            <span class="text-xs">{{ formatTime(message.timestamp) }}</span>
            <span v-if="message.role !== 'user'" class="mx-1">•</span>
            <span v-if="message.role !== 'user'" class="text-xs opacity-70">{{ message.channel }}</span>
          </div>

          <!-- Message Content -->
          <div
              :class="[
              'px-3 py-2 rounded-lg relative cursor-pointer',
              message.role === 'user'
                ? 'bg-blue-600 text-white ml-auto'
                : message.role === 'system'
                ? 'bg-gray-600 text-gray-200'
                : message.role === 'assistant'
                ? 'bg-green-600 text-white mr-auto'
                : 'bg-gray-700 text-white mr-auto',
            ]"
              @mouseenter="showTooltip(message, $event)"
              @mouseleave="hideTooltip"
          >
            <p class="text-xs">{{ message.message }}</p>
          </div>

          <!-- Additional Info -->
          <div
              :class="[
              'text-xs mt-1',
              message.role === 'user' ? 'text-right' : 'text-left'
            ]"
          >
            <span
                :class="[
                'inline-block px-2 py-1 rounded-full text-xs',
                message.role === 'user' ? 'bg-blue-500/20 text-blue-300' :
                message.role === 'assistant' ? 'bg-green-500/20 text-green-300' :
                'bg-gray-500/20 text-gray-300'
              ]"
            >
              {{message.username}}
            </span>
            <span class="text-gray-500 ml-2 text-xs">{{ message.member_id }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="bg-gray-800 border-t border-gray-700 p-3">
      <form @submit.prevent="handleSendMessage" class="flex gap-2">
        <input
            v-model="messageInput"
            type="text"
            placeholder="Type your message..."
            :disabled="!isConnected"
            class="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
            type="submit"
            :disabled="!isConnected || !messageInput.trim()"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Send
        </button>
      </form>
    </div>

    <!-- Hacker-Style Teleported Tooltip -->
    <Teleport to="body">
      <div
          v-if="activeTooltip && activeMessage"
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
              <span class="text-green-400 font-mono text-sm font-bold">MESSAGE.DEBUG</span>
              <div class="flex-1"></div>
              <span class="text-green-300/70 font-mono text-xs">
              {{ new Date().toLocaleTimeString() }}
            </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4 font-mono text-sm">
            <!-- System info bar -->
            <div class="flex items-center gap-2 mb-3 text-green-300/70 text-xs">
              <span class="bg-green-500/20 px-2 py-1 rounded">SYS</span>
              <span>ACCESSING DATA STREAM...</span>
              <div class="flex gap-1">
                <div class="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                <div class="w-1 h-1 bg-green-400 rounded-full animate-ping animation-delay-100"></div>
                <div class="w-1 h-1 bg-green-400 rounded-full animate-ping animation-delay-200"></div>
              </div>
            </div>

            <!-- JSON content -->
            <div class="bg-black/50 border border-green-500/30 rounded p-3 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
              <pre class="text-green-400 text-xs leading-relaxed whitespace-pre-wrap">{{ JSON.stringify(activeMessage, null, 2) }}</pre>
            </div>

            <!-- Footer info -->
            <div class="flex items-center justify-between mt-3 text-green-300/50 text-xs">
              <span>{{ Object.keys(activeMessage).length }} FIELDS</span>
              <span>{{ JSON.stringify(activeMessage).length }} BYTES</span>
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

  </div>
</template>

<style scoped>
.messages-container {
  scroll-behavior: smooth;
}


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