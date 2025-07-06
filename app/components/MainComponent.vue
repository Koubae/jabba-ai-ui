<script setup lang="ts">
const { isAuthenticated, logout } = useAuth()

</script>

<template>

  <div>
    <p @click="navigateTo('/')" style="cursor: pointer">Jabba AI</p>
    <nav class="navigation">
      <Transition name="fade" mode="out-in">
        <!-- Not authenticated -->
        <div v-if="!isAuthenticated" key="public" class="nav-section">
          <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
          <NuxtLink to="/signup" class="nav-link">Signup</NuxtLink>
        </div>

        <!-- Authenticated -->
        <div v-else key="private" class="nav-section">
          <NuxtLink to="/home" class="nav-link">Home</NuxtLink>
          <button @click="logout" class="nav-button">Logout</button>
        </div>
      </Transition>
    </nav>

    <NuxtPage />
  </div>

</template>


<style scoped>
.navigation {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-section {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.nav-button {
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

