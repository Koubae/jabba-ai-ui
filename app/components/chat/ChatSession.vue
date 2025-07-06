<script setup lang="ts">
import type { SessionConnection } from "~/common/interfaces";
import { useWebSocketChat } from "~/composables/useWebSocketChat";

interface Props {
  sessionConnection: SessionConnection;
}

const props = defineProps<Props>();
const messageInput = ref('');
const messagesContainer = ref<HTMLElement>();

const { messages, isConnected, connectionError, connect, sendMessage, disconnect } = useWebSocketChat(props.sessionConnection);

const handleSendMessage = () => {
  if (!messageInput.value.trim() || !isConnected.value) return;

  sendMessage(messageInput.value.trim());
  messageInput.value = '';
};

const formatTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

function generateUUID() {
  // UUIDv4 pattern: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0; // random integer from 0 to 15
    const v = c === 'x' ? r : (r & 0x3 | 0x8); // 'y' is 8, 9, A, or B
    return v.toString(16);
  });
}

// Auto-scroll when new messages arrive
watch(messages, () => {
  scrollToBottom();
});

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
    <div class="bg-gray-800 p-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-white font-semibold">{{ sessionConnection.name }}</h3>
          <p class="text-gray-400 text-sm">Session ID: {{ sessionConnection.id }}</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <div
                :class="[
                'w-3 h-3 rounded-full',
                isConnected ? 'bg-green-500' : 'bg-red-500'
              ]"
            ></div>
            <span class="text-sm text-gray-400">
              {{ isConnected ? 'Connected' : 'Disconnected' }}
            </span>
          </div>
          <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Connection Error -->
    <div v-if="connectionError" class="bg-red-500/10 border-b border-red-500/30 p-3">
      <div class="flex items-center gap-2">
        <span class="text-red-400">⚠</span>
        <span class="text-red-400 text-sm">{{ connectionError }}</span>
      </div>
    </div>

    <!-- Messages Area -->
    <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4"
    >
      <div
          v-for="message in messages"
          :key="message.timestamp + generateUUID()"
          :class="[
          'flex',
          message.role === 'user' ? 'justify-end' : 'justify-start'
        ]"
      >
        <div
            :class="[
              'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
              message.role === 'user'
                ? 'bg-blue-600 text-white ml-auto'
                : message.role === 'system'
                ? 'bg-gray-600 text-gray-200'
                : message.role === 'assistant'
                ? 'bg-green-600 text-white mr-auto'
                : 'bg-gray-700 text-white mr-auto',
            ]"
        >

        <p class="text-sm">{{ message.message }}</p>
          <p class="text-xs opacity-70 mt-1">
            {{ formatTime(message.timestamp) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="bg-gray-800 border-t border-gray-700 p-4">
      <form @submit.prevent="handleSendMessage" class="flex gap-2">
        <input
            v-model="messageInput"
            type="text"
            placeholder="Type your message..."
            :disabled="!isConnected"
            class="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
            type="submit"
            :disabled="!isConnected || !messageInput.trim()"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>