<script setup lang="ts">
import type {Session} from "~/common/interfaces";

definePageMeta({
  middleware: 'auth'
})
const route = useRoute()
const router = useRouter()

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
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-white mb-2">{{ sessionData.name }}</h2>
        </div>

        <!-- JSON Display -->
        <div class="bg-gray-900/50 rounded-lg p-4 border border-white/10">
          <h3 class="text-white font-semibold mb-3">Session JSON</h3>
          <pre class="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">{{ JSON.stringify(sessionData, null, 2) }}</pre>
        </div>

        <!-- Additional Info -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-white font-medium mb-2">Session ID</h4>
            <p class="text-white/70 font-mono text-sm">{{ sessionData.id }}</p>
          </div>
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-white font-medium mb-2">Created</h4>
            <p class="text-white/70">{{ new Date(sessionData.created).toLocaleString() }}</p>
          </div>
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-white font-medium mb-2">Last Updated</h4>
            <p class="text-white/70">{{ new Date(sessionData.updated).toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else class="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <h3 class="text-red-400 font-semibold mb-2">Error Loading Session</h3>
        <p class="text-red-300/70 mb-4">Unable to load session data</p>
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