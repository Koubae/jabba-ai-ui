<script setup>
import { ref } from 'vue'
import {redirectToLoginPage} from "~/common/redirects.js";

const applicationID = ref()
const username = ref()
const password = ref()

const { signup, loading, error } = useSignup()

async function submitSignup() {
  const result = await signup(applicationID.value, username.value, password.value)
  if (result) {
    await redirectToLoginPage()
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    <LoadingSpinner
        v-if="loading"
        text="Signing up..."
        container-class="min-h-[400px]"
    />

    <form v-else @submit.prevent="submitSignup" class="space-y-4">
      <input
          v-model="applicationID"
          type="text"
          placeholder="Application ID"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
          v-model="username"
          type="text"
          placeholder="Username"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Sign Up
      </button>
      <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
    </form>
    <p class="mt-4 text-center text-gray-600">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-800 underline">Login here</NuxtLink>
    </p>
  </div>
</template>
