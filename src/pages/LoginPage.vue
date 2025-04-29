<template>
  <q-page class="row items-center justify-center" style="min-height: 100vh;">
    <!-- Columna izquierda: Imagen y mensaje -->
    <div class="col-12 col-md-7 login-left flex flex-center">
      <div class="login-left-content">
        <div class="text-h3 text-white q-pb-xl">
          Operaciones Express
        </div>
        <div class="row q-col-gutter-md q-mb-md justify-center">
          <div class="col-4">
            <q-img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
              ratio="1" class="rounded-borders" />
          </div>
          <div class="col-4">
            <q-img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
              ratio="1" class="rounded-borders" />
          </div>
          <div class="col-4">
            <q-img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              ratio="1" class="rounded-borders" />
          </div>
        </div>
        <div class="row q-col-gutter-md justify-center">
          <div class="col-4">
            <q-btn color="red-7" class="full-width" label="Facturar Express" unelevated rounded to="/invoice" />
          </div>
          <div class="col-4">
            <q-btn color="red-7" class="full-width" label="Consultar Factura" unelevated rounded to="/invoices" />
          </div>
          <div class="col-4">
            <q-btn color="red-7" class="full-width" label="Preguntas Frecuentes" unelevated rounded />
          </div>
        </div>
      </div>
    </div>

    <!-- Columna derecha: Formulario de login -->
    <div class="col-12 col-md-5 flex flex-center login-right">
      <div class="login-form-container">
        <div class="text-h5 text-center q-mb-md">Experiencia</div>
        <div class="flex flex-center q-mb-lg">
          <img src="https://lsco.vtexassets.com/arquivos/logoLsco.png" alt="Levi's"
            style="height: 60px; margin-bottom: 24px;" />
        </div>
        <q-form @submit="onSubmit">
          <q-input v-model="correo" filled label="Correo electrónico" class="q-mb-md" :error="!!errors.correo"
            :error-message="errors.correo" />
          <q-input v-model="password" filled label="Contraseña" type="password" class="q-mb-lg"
            :error="!!errors.password" :error-message="errors.password" />
          <q-btn color="red-7" class="full-width q-mb-md" label="Iniciar Sesión" unelevated rounded type="submit"
            :loading="loading" />
          <div class="row q-col-gutter-md">
            <div class="col">
              <q-btn color="red-7" class="full-width" label="Recuperar contraseña" flat rounded
                to="/recover-password" />
            </div>
            <div class="col">
              <q-btn color="red-7" class="full-width" label="Registrarte" flat rounded to="/auth/register" />
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores';
const authStore = useAuthStore()
const router = useRouter();
const $q = useQuasar();

const correo = ref('');
const password = ref('');
const loading = ref(false);
const errors = reactive({
  correo: '',
  password: ''
});

async function onSubmit () {
  // Validación básica
  errors.correo = '';
  errors.password = '';

  if (!correo.value) {
    errors.correo = 'El usuario es requerido';
    return;
  }

  if (!password.value) {
    errors.password = 'La contraseña es requerida';
    return;
  }

  try {
    loading.value = true;
    await authStore.iniciarSesion({
      correo: correo.value,
      password: password.value
    });

    $q.notify({
      color: 'positive',
      message: 'Inicio de sesión exitoso',
      icon: 'check'
    });

    // Redirigir al dashboard o página principal
    await router.push('/');
  } catch (error) {
    console.error('Error de login:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al iniciar sesión. Verifica tus credenciales.',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
body>.q-header {
  display: none;
}

.login-left {
  min-height: 100vh;
  padding: 0;
  position: relative;
  background-color: #c41230; // Color rojo primario
}

.login-left-content {
  width: 100%;
  max-width: 800px;
  padding: 48px;
}

.login-right {
  background: #fff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-container {
  width: 100%;
  max-width: 400px;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  padding: 0 48px;
}

.rounded-borders {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.q-btn {
  height: 48px;
  font-weight: 500;
}
</style>
