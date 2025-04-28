<template>
  <q-page class="row items-center justify-center q-pa-xl" style="min-height: 100vh;">
    <!-- Columna izquierda -->
    <div class="col-12 col-md-7 flex flex-center">
      <div class="q-pa-lg" style="width: 100%;">
        <div class="text-h5 q-mb-md">Operaciones express</div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-4">
            <q-img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
              ratio="1" />
          </div>
          <div class="col-4">
            <q-img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
              ratio="1" />
          </div>
          <div class="col-4">
            <q-img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              ratio="1" />
          </div>
        </div>
        <div class="row q-col-gutter-md">
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

    <!-- Columna derecha -->
    <div class="col-12 col-md-5 flex flex-center">
      <q-card class="q-pa-xl" style="width: 100%; max-width: 400px;">
        <div class="text-h5 text-center q-mb-md">Experiencia Levi's</div>
        <div class="flex flex-center q-mb-lg">
          <q-avatar size="100px" icon="person" color="grey-4" text-color="grey-7" />
        </div>
        <q-form @submit="onSubmit">
          <q-input v-model="correo" filled label="Usuario" class="q-mb-md" :error="!!errors.correo"
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
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { authService } from 'src/services/api';
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
    router.push('/');
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

<style lang="sass">
.q-header
  background-color: transparent
</style>
