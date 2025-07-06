<script setup lang="ts">
import type {Session, SessionConnection} from "~/common/interfaces";
import {useStartSessions} from "~/composables/usesStartSessions";

definePageMeta({
  middleware: 'auth'
})
const route = useRoute()
const { startSession } = useStartSessions();

// Get session data from query params
const sessionData = computed(() => {
  if (route.query.data) {
    try {
      return JSON.parse(route.query.data as string) as Session
    } catch (err) {
      console.error('Failed to parse session data:', err)
      return null
    }
  }
  return null
})

const isLoading = ref(false)
const error = ref('')
const success = ref(false)
const sessionConnection = ref<SessionConnection | null>(null)
const router = useRouter()
const goBack = () => {
  router.push('/dashboard/session/list')
}
const sendCreateSessionRequest = async () => {
  isLoading.value = true
  error.value = ''

  const name = sessionData.value?.name || '';
  if (!name) {
    error.value = "Session must have a name"
    isLoading.value = false
    return
  }

  try {
    const sessionPayload = await startSession(name, "chat-tab", "browser");

    if (sessionPayload) {
      sessionConnection.value = sessionPayload;
      success.value = true;
      console.log('Session started successfully:', sessionPayload);
    }

  } catch (err) {
    error.value = 'Failed to start session. Please try again.'
    console.error('Error starting session:', err)
  } finally {
    isLoading.value = false
  }
}

const closeChatSession = () => {
  sessionConnection.value = null;
  success.value = false;
}

onMounted(async () => {
  if (!sessionData.value) {
    alert("Session data not loaded, session can't start");
    return
  }

  await sendCreateSessionRequest()
})
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 max-w-6xl">

      <EffectsLoadingSpinner
          v-if="isLoading"
          text="Connecting to Jabba-AI Bot..."
          container-class="min-h-[400px]"
      />

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <h3 class="text-red-400 font-semibold mb-2">Error Starting Session</h3>
        <p class="text-red-300/70 mb-4">{{ error }}</p>
        <div class="flex gap-4 justify-center">
          <button
              @click="sendCreateSessionRequest"
              class="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            Try Again
          </button>
          <button
              @click="goBack"
              class="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Return to Sessions
          </button>
        </div>
      </div>

      <!-- Chat Session -->
      <div v-else-if="success && sessionConnection" class="h-[calc(100vh-8rem)]">
        <ChatSession
            :session-connection="sessionConnection"
            @close="closeChatSession"
        />
      </div>

      <!-- Fallback State (shouldn't normally be reached) -->
      <div v-else class="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-6 text-center">
        <h3 class="text-white font-semibold mb-2">Session Ready</h3>
        <p class="text-white/70 mb-4">Click the button below to start your chat session</p>
        <button
            @click="sendCreateSessionRequest"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Start Chat Session
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>