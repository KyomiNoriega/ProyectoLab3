<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="layout">
    <HeaderComponent v-if="!$route.path.startsWith('/login')" class="header" />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  flex: 0 0 auto;
}

.content {
  flex: 1 1 auto;
  
}
</style>