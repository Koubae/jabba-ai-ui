<script setup>
definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <div>
    <nav>
      <NuxtLink to="/dashboard/applications" class="">
        <span class="relative z-10">Applications</span>
      </NuxtLink>
    </nav>

    <NuxtPage />

  </div>
</template>
