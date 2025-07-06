<script setup>
import { logout } from '~/common/auth'

definePageMeta({
  middleware: 'auth'
})


</script>

<template>
  <div>
    <h1>Home</h1>
    <p>This is a Home. You can only see this if you're logged in.</p>
    <button @click="logout">Logout</button>
  </div>
</template>