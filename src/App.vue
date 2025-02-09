<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="layout">
    <HeaderComponent v-if="!$route.path.startsWith('/login')" class="header" />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>