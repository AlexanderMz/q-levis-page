<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      v-if="!router.currentRoute.value.path.includes('login') && !router.currentRoute.value.path.includes('recover-password')">
      <q-toolbar>
        <img src="https://lsco.vtexassets.com/arquivos/logoLsco.png" alt="Levi's"
          style="height: 60px; margin-bottom: 24px;" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-content {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-logo {
  text-align: center;
}

.auth-logo-img {
  max-width: 200px;
  height: auto;
}
</style>
