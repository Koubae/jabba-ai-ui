<script setup>
import { ref } from 'vue'

const applicationID = ref()
const username = ref()
const password = ref()

const { login, loading, error } = useLogin()

async function submitLogin() {
  localStorage.setItem('currentApplicationID', applicationID.value)
  localStorage.setItem('currentUsername', username.value)

  const result = await login(applicationID.value, username.value, password.value)
  if (result) {
    await navigateTo('/home')
  }
}

onMounted(() => {
  const currentApplicationID = localStorage.getItem('currentApplicationID')
  const currentUsername = localStorage.getItem('currentUsername')

  if (currentApplicationID) applicationID.value = currentApplicationID
  if (currentUsername) username.value = currentUsername
})


</script>

<template>
  <div class="login-form">
    <h2>Login</h2>
    <form autocomplete="on" @submit.prevent="submitLogin">
      <input v-model="applicationID" type="text" placeholder="Application ID"  required />
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <p>
      Or Create a new account
      <NuxtLink to="/signup">Singup here</NuxtLink>
    </p>

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
