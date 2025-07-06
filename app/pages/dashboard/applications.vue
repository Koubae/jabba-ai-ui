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
    applications.value = result
  } catch (err) {
    console.error('Failed to fetch applications:', err)
  }
}


onMounted(async () => {
  loadApplications()
})
</script>

<template>
  <div>
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

    <div v-else-if="applications" class="space-y-4">
      <div v-for="app in applications" :key="app.id" class="p-4 bg-white/10 rounded-lg">
        <h3 class="text-white font-semibold">{{ app.name }}</h3>
        <p class="text-white/70">{{ app.description }}</p>
      </div>
    </div>
    <div v-else class="p-8 text-center text-white/60">
      No applications found
    </div>


  </div>

</template>

<style scoped>

</style>