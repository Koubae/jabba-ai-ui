<script setup lang="ts">
import FooterComponent from "~/components/misc/FooterComponent.vue";
import HeaderComponent from "~/components/misc/HeaderComponent.vue";
import CoolEffectMain from "~/components/effects/CoolEffectMain.vue";

</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <CoolEffectMain/>
    <HeaderComponent/>

    <!-- Main Content -->
    <main class="min-h-[85vh] flex-1 relative z-10">
      <NuxtPage />
    </main>

    <FooterComponent/>
  </main>
</template>
