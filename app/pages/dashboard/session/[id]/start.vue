
<script setup lang="ts">
import type {Session, SessionConnection} from "~/common/interfaces";
import {useStartSessions} from "~/composables/usesStartSessions";
import {useLoginForOtherUser} from "~/composables/useLoginForOtherUser";

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { startSession } = useStartSessions();
const {loginOther} = useLoginForOtherUser()
const {signup} = useSignup()
const { user } = useUser()

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

// Add member popup state
const showAddMemberPopup = ref(false)
const addMemberForm = ref({
  username: '',
  password: ''
})
const addMemberLoading = ref(false)
const addMemberError = ref('')

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

const openAddMemberPopup = () => {
  showAddMemberPopup.value = true
  addMemberForm.value = { username: '', password: '' }
  addMemberError.value = ''
}

const closeAddMemberPopup = () => {
  showAddMemberPopup.value = false
  addMemberForm.value = { username: '', password: '' }
  addMemberError.value = ''
}

const validateAddMemberForm = () => {
  if (!addMemberForm.value.username.trim()) {
    addMemberError.value = 'Username is required'
    return false
  }

  if (!addMemberForm.value.password.trim()) {
    addMemberError.value = 'Password is required'
    return false
  }

  if (addMemberForm.value.username.trim() === user.value?.username) {
    addMemberError.value = 'Cannot add yourself as a member'
    return false
  }

  return true
}

const addMember = async () => {
  if (!validateAddMemberForm()) return

  const applicationID: string = sessionConnection.value?.application_id || '';
  if (!applicationID) {
    addMemberError.value = "Cannot add new member, ApplicationID not found"
    return
  }

  addMemberLoading.value = true
  addMemberError.value = ''

  try {
    await signup(applicationID, addMemberForm.value.username, addMemberForm.value.password)
    const newUser = await loginOther(applicationID, addMemberForm.value.username, addMemberForm.value.password)

    console.log('New member added successfully:', newUser)

    // TODO: Add logic to create a new SessionManager component with the new member
    // You can pass a copy of sessionConnection with the new member data

    closeAddMemberPopup()
  } catch (err) {
    addMemberError.value = 'Failed to add member. Please try again.'
    console.error('Error adding member:', err)
  } finally {
    addMemberLoading.value = false
  }
}

// Step 1: On mount, make a single call to collect sessionConnection data
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
    <!-- Top Left Button -->
    <button
        @click="openAddMemberPopup"
        class="absolute cursor-pointer top-0 left-0 z-[9999] px-6 py-3 bg-yellow-600 hover:bg-yellow-400 text-white font-medium rounded-lg transition-colors shadow-lg"
    >
      Add Member
    </button>

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

      <!-- Step 2: Initialize the chat using the new SessionManager component -->
      <div v-else-if="success && sessionConnection">
        <ChatSessionManager
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

    <!-- Add Member Popup -->
    <div v-if="showAddMemberPopup" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-white font-semibold text-xl mb-4">Add New Member</h3>

        <!-- Error Message -->
        <div v-if="addMemberError" class="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p class="text-red-400 text-sm">{{ addMemberError }}</p>
        </div>

        <form @submit.prevent="addMember">
          <div class="mb-4">
            <label for="username" class="block text-white font-medium mb-2">
              Username *
            </label>
            <input
                id="username"
                v-model="addMemberForm.username"
                type="text"
                placeholder="Enter username"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :disabled="addMemberLoading"
                required
            />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-white font-medium mb-2">
              Password *
            </label>
            <input
                id="password"
                v-model="addMemberForm.password"
                type="password"
                placeholder="Enter password"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :disabled="addMemberLoading"
                required
            />
          </div>

          <div class="flex gap-3">
            <button
                type="submit"
                :disabled="addMemberLoading"
                class="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span v-if="addMemberLoading" class="animate-spin">⟳</span>
              <span v-else>+</span>
              {{ addMemberLoading ? 'Adding...' : 'Add Member' }}
            </button>

            <button
                type="button"
                @click="closeAddMemberPopup"
                :disabled="addMemberLoading"
                class="px-4 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        <div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p class="text-blue-300 text-sm">
            <span class="font-medium">Note:</span> You cannot add yourself as a member. Current user: {{ user?.username }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>