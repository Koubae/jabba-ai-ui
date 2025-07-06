<script setup>
// This middleware will check if user is authenticated
definePageMeta({
  middleware: 'auth'
})

function logout() {
  // Clear the auth token cookie

  // Clear up logged-in in information
  const cookie = useCookie('access_token')
  cookie.value = null
  localStorage.setItem('user', null)
  /// ----

  // Redirect to login page
  navigateTo('/login')
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>This is a Home. You can only see this if you're logged in.</p>
    <button @click="logout">Logout</button>
  </div>
</template>