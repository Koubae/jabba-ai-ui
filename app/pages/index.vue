<script setup lang="ts">
const { isAuthenticated,  } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo('/home')
  } else {
    navigateTo("/auth/login")
  }
})
</script>
