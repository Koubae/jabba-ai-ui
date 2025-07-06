<script setup>
import { ref } from 'vue'
const username = ref('user_1')
const password = ref('pass')
const applicationID = "application_001"

const { login, loading, error } = useLogin()

async function submitLogin() {
  const result = await login(applicationID, username.value, password.value)
  if (result) {
    await navigateTo('/protected')
  }
}
</script>

<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-form {
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
