<script setup>
// This middleware will check if user is authenticated
definePageMeta({
  middleware: 'auth'
})

function logout() {
  // Clear the auth token cookie
  const cookie = useCookie('access_token')
  cookie.value = null
  // Redirect to login page
  navigateTo('/login')
}
</script>

<template>
  <div>
    <h1>Protected Page</h1>
    <p>This is a protected page. You can only see this if you're logged in.</p>
    <button @click="logout">Logout</button>
  </div>
</template>