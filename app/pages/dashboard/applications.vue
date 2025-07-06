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

    <ErrorCard
        v-else-if="error || authError"
        :error="error"
        :auth-error="authError"
        title="Failed to Load Applications"
        icon="🚨"
        @retry="loadApplications"
    />

    <div v-else-if="applications" class="container mx-auto px-4">
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


    <div v-else class="p-8 text-center text-white/60">
      No applications found
    </div>


  </div>

</template>

<style scoped>

</style>