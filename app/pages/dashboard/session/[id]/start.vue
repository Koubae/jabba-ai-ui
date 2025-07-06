<script setup lang="ts">
import type {Session} from "~/common/interfaces";
import {useStartSessions} from "~/composables/usesStartSessions";

definePageMeta({
  middleware: 'auth'
})
const route = useRoute()
const router = useRouter()
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

const goBack = () => {
  router.push('/dashboard/session/list')
}


const isLoading = ref(false)
const error = ref('')
const success = ref(false)
const sendCreateSessionRequest = async () => {
  isLoading.value = true
  error.value = ''

  const name = sessionData.value?.name || '';
  if (!name) {
    error.value = "Session must have a name"
    return
  }

  try {

    const sessionPayload = await startSession(name, "chat-tab", "browser");
    success.value = true
    console.log(sessionPayload)


  } catch (err) {
    error.value = 'Failed to create session. Please try again.'
    console.error('Error creating session:', err)
  } finally {
    isLoading.value = false
  }
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
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Session Details</h1>
        <button
            @click="goBack"
            class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          ← Back to Sessions
        </button>
      </div>

      <!-- Session Details -->
      <div v-if="sessionData" class="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-6">
        <p>todo</p>
      </div>

      <!-- Error state -->
      <div v-else class="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <h3 class="text-red-400 font-semibold mb-2">Error Starting Session</h3>
        <p class="text-red-300/70 mb-4">Unable to start session</p>
        <button
            @click="goBack"
            class="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          Return to Sessions
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>