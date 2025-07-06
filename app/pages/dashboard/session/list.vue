<script setup lang="ts">
import type {Session} from "~/common/interfaces";
import {useListSessions} from "~/composables/useListSessions";

definePageMeta({
  middleware: 'auth'
})

const { loading, error, authError, fetchSessions } = useListSessions()
const sessions = ref<Array<Session>>([])

const loadSessions = async () => {
  try {
    const result = await fetchSessions()
    if (result) {
      sessions.value = result
    }
  } catch (err) {
    console.error('Failed to fetch sessions:', err)
  }
}

const viewSession = (session: Session) => {
  navigateTo({
    path: `/dashboard/session/${session.id}`,
    query: {
      data: JSON.stringify(session)
    }
  })
}

const createNewSession = () => {
  navigateTo('/dashboard/session/create')
}

const startSession = (session: Session, event: Event) => {
  // Prevent the card click event from firing
  event.stopPropagation()

  navigateTo({
    path: `/dashboard/session/${session.id}/start`,
    query: {
      data: JSON.stringify(session)
    }
  })

}


onMounted(async () => {
  loadSessions()
})
</script>

<template>
  <div class="mt-8">
    <EffectsLoadingSpinner
        v-if="loading"
        text="Loading Sessions..."
        container-class="min-h-[200px]"
    />

    <div v-else-if="error || authError">
      <ErrorCard
          :error="error"
          :auth-error="authError"
          title="Failed to Load Sessions"
          icon="🚨"
          @retry="loadSessions"
      />
      <div class="p-8 text-center text-white/60">
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-medium text-white mb-2">No sessions found</h3>
          <p class="text-white/50 mb-6">Get started by creating your first session</p>
          <button
              @click="createNewSession"
              class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
          >
            Create New Session
          </button>
        </div>
      </div>
    </div>


    <div v-else-if="sessions" class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-white">Sessions</h1>
        <button
            @click="createNewSession"
            class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
        >
          <span class="text-lg">+</span>
          New Session
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <div
            v-for="session in sessions"
            :key="session.id"
            @click="viewSession(session)"
            class="w-full max-w-sm p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer hover:scale-105 transform"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-white font-semibold text-lg">{{ session.name }}</h3>
            <button
                @click="startSession(session, $event)"
                class="px-3 py-1 cursor-crosshair bg-green-500/80 hover:bg-green-500 text-white text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1 hover:scale-105 transform shadow-sm"
                title="Start Session"
            >
              <span class="text-xs">▶</span>
              Start
            </button>
          </div>

          <div class="mt-4 pt-4 border-t border-white/10">
            <p class="text-white/50 text-xs">Created: {{ new Date(session.created).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-white">Sessions</h1>
        <button
            @click="createNewSession"
            class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
        >
          <span class="text-lg">+</span>
          New Session
        </button>
      </div>

      <!-- Empty State -->
      <div class="p-8 text-center text-white/60">
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-medium text-white mb-2">No sessions found</h3>
          <p class="text-white/50 mb-6">Get started by creating your first session</p>
          <button
              @click="createNewSession"
              class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
          >
            Create New Session
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>