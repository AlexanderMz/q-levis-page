<template>
  <q-drawer show-if-above side="left" bordered class="bg-white" :width="260">
    <div class="q-pa-md flex flex-center">
      <img src="https://lsco.vtexassets.com/arquivos/logoLsco.png" alt=" Levi's" style="height: 60px;" />
    </div>
    <q-list separator>
      <q-item v-for="(item) in menu" :key="item.label" clickable :active="isActiveRoute(item.route)"
        @click="navigateTo(item.route)" active-class="bg-grey-4">
        <q-item-section>
          <span class="text-weight-bold" :class="isActiveRoute(item.route) ? 'text-dark' : 'text-grey-8'">
            {{ item.label }}
          </span>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator class="q-my-md" />

    <div class="q-pa-md">
      <div class="text-subtitle2 q-mb-sm">Bienvenido, {{ userInfo.razonSocial || 'Usuario' }}</div>
      <q-btn color="red-7" label="Cerrar Sesión" class="full-width" unelevated rounded @click="cerrarSesion" />
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { userService } from 'src/services/api';
import { useAuthStore } from 'src/stores';
const useAuth = useAuthStore()
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const userInfo = ref({
  razonSocial: '',
  correo: ''
});

interface MenuItem {
  label: string;
  route: string;
}

const menu: MenuItem[] = [
  { label: 'Inicio', route: '/' },
  { label: 'Facturación', route: '/invoice' },
  { label: 'Datos Personales', route: '/profile' },
  { label: 'Ofertas', route: '/offers' },
  { label: 'Eventos', route: '/events' }
];

// Función para verificar si una ruta está activa
function isActiveRoute (routePath: string): boolean {
  // Si es la ruta principal, verificar si estamos en la raíz
  if (routePath === '/') {
    return route.path === '/';
  }

  // Para otras rutas, verificar si la ruta actual comienza con la ruta del menú
  return route.path.startsWith(routePath);
}

onMounted(async () => {
  await loadUserInfo();
});

async function loadUserInfo () {
  try {
    const user = await userService.getProfile();
    userInfo.value = user;
  } catch (error) {
    console.error('Error al cargar información del usuario:', error);
  }
}

async function navigateTo (route: string) {
  await router.push(route);
}

async function cerrarSesion () {
  useAuth.cerrarSesion()
  $q.notify({
    color: 'positive',
    message: 'Sesión cerrada correctamente',
    icon: 'check'
  });
  await router.push('/auth/login');
}
</script>

<style scoped>
.q-drawer {
  border-radius: 16px;
  min-height: 100vh;
}
</style>
