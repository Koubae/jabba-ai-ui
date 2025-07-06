<script setup lang="ts">
import type {Application} from "~/common/interfaces";

definePageMeta({
  middleware: 'auth'
})

const { loading, error, authError, fetchApplications } = useListApplications()
const applications = ref<Array<Application>>([])

const loadApplications = async () => {
  try {
    const result = await fetchApplications()
    if (result) {
      applications.value = result
    }
  } catch (err) {
    console.error('Failed to fetch applications:', err)
  }
}

const viewApplication = (app: Application) => {
  // Navigate to the view application page with the application data
  navigateTo({
    path: `/dashboard/application/${app.id}`,
    query: {
      data: JSON.stringify(app)
    }
  })
}

const createNewApplication = () => {
  navigateTo('/dashboard/application/create')
}

onMounted(async () => {
  loadApplications()
})
</script>

<template>
  <div class="mt-8">
    <EffectsLoadingSpinner
        v-if="loading"
        text="Loading Applications..."
        container-class="min-h-[200px]"
    />

    <div v-else-if="error || authError">
      <ErrorCard
          :error="error"
          :auth-error="authError"
          title="Failed to Load Applications"
          icon="🚨"
          @retry="loadApplications"
      />
      <div class="p-8 text-center text-white/60">
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-medium text-white mb-2">No applications found</h3>
          <p class="text-white/50 mb-6">Get started by creating your first application</p>
          <button
              @click="createNewApplication"
              class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
          >
            Create New Application
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="applications" class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-white">Applications</h1>
        <button
            @click="createNewApplication"
            class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
        >
          <span class="text-lg">+</span>
          New Application
        </button>
      </div>

      <!-- Applications Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <div
            v-for="app in applications"
            :key="app.id"
            @click="viewApplication(app)"
            class="w-full max-w-sm p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer hover:scale-105 transform"
        >
          <h3 class="text-white font-semibold text-lg mb-2">{{ app.name }}</h3>
          <div class="mt-4 pt-4 border-t border-white/10">
            <p class="text-white/50 text-xs">Created: {{ new Date(app.created).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-white">Applications</h1>
        <button
            @click="createNewApplication"
            class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
        >
          <span class="text-lg">+</span>
          New Application
        </button>
      </div>

      <!-- Empty State -->
      <div class="p-8 text-center text-white/60">
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-medium text-white mb-2">No applications found</h3>
          <p class="text-white/50 mb-6">Get started by creating your first application</p>
          <button
              @click="createNewApplication"
              class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
          >
            Create New Application
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>