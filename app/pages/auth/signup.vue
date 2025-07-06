<script setup>
import { ref } from 'vue'

const applicationID = ref()
const username = ref()
const password = ref()

const { signup, loading, error } = useSignup()

async function submitSignup() {
  const result = await signup(applicationID.value, username.value, password.value)
  if (result) {
    await navigateTo('/auth/login')
  }
}
</script>

<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <form @submit.prevent="submitSignup">
      <input v-model="applicationID" type="text" placeholder="Application ID" required />
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Sign Up</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p>
      Already have an account?
      <NuxtLink to="/auth/login">Login here</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: auto;
}
input {
  display: block;
  margin-bottom: 1em;
  width: 100%;
  padding: 0.5em;
}
.error {
  color: red;
}
</style>