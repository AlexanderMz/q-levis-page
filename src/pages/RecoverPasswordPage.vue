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
            <q-img src="img/image2.jpeg" ratio="1" class="rounded-borders" />
          </div>
          <div class="col-4">
            <q-img src="img/image1.jpeg" ratio="1" class="rounded-borders" />
          </div>
          <div class="col-4">
            <q-img src="img/image3.jpeg" ratio="1" class="rounded-borders" />
          </div>
        </div>
        <div class="row q-col-gutter-md justify-center">
          <div class="col-4">
            <q-btn color="white" class="full-width text-red" label="Facturar Express" unelevated rounded
              to="/invoice" />
          </div>
          <div class="col-4">
            <q-btn color="white" class="full-width text-red" label="Consultar Factura" unelevated rounded
              to="/invoices" />
          </div>
          <div class="col-4">
            <q-btn color="white" class="full-width text-red" label="Preguntas Frecuentes" unelevated rounded />
          </div>
        </div>
      </div>
    </div>

    <!-- Columna derecha: Formulario de recuperación -->
    <div class="col-12 col-md-5 flex flex-center login-right">
      <div class="login-form-container">
        <div class="flex flex-center q-mb-md">
          <img src="img/marca.png" alt="Marca" class="marca-img" />
        </div>

        <div v-if="step === 1">
          <div class="text-h5 text-center q-mb-lg">Recuperar Contraseña</div>
          <div class="text-subtitle1 text-center q-mb-lg text-grey-8">
            Ingresa tu correo electrónico para validar tu cuenta
          </div>

          <q-form @submit="onValidateMail">
            <q-input v-model="email" filled label="Correo electrónico" class="q-mb-md"
              :rules="[val => !!val || 'El correo es requerido', val => /.+@.+\..+/.test(val) || 'Correo inválido']" />

            <q-btn color="red-7" class="full-width q-mb-md" label="Validar Correo" unelevated rounded type="submit"
              :loading="loading" />

            <q-btn color="grey-7" class="full-width" label="Volver al Login" flat rounded to="/auth/login" />
          </q-form>
        </div>

        <div v-else-if="step === 2">
          <div class="text-h5 text-center q-mb-lg">Cambiar Contraseña</div>
          <div class="text-subtitle1 text-center q-mb-lg text-grey-8">
            Ingresa tu nueva contraseña
          </div>

          <q-form @submit="onChangePassword">
            <q-input v-model="newPassword" filled label="Nueva Contraseña" type="password" class="q-mb-md" :rules="[
              val => !!val || 'La contraseña es requerida',
              val => val.length >= 6 || 'Mínimo 6 caracteres'
            ]" />

            <q-input v-model="confirmPassword" filled label="Repetir Contraseña" type="password" class="q-mb-lg" :rules="[
              val => val === newPassword || 'Las contraseñas no coinciden'
            ]" />

            <q-btn color="red-7" class="full-width q-mb-md" label="Cambiar Contraseña" unelevated rounded type="submit"
              :loading="loading" />

            <q-btn color="grey-7" class="full-width" label="Cancelar" flat rounded @click="resetFlow" />
          </q-form>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { authService } from 'src/services/api';

const router = useRouter();
const $q = useQuasar();

const step = ref(1);
const loading = ref(false);

const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const resetFlow = async () => {
  step.value = 1;
  email.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  await router.push('/auth/login');
}

const onValidateMail = async () => {
  try {
    loading.value = true;
    await authService.validateMail(email.value);
    // If successful, move to next step
    step.value = 2;
    $q.notify({
      color: 'positive',
      message: 'Correo validado correctamente',
      icon: 'check'
    });
  } catch (error: any) {
    $q.notify({
      color: 'negative',
      message: error.response?.data?.message || 'Error al validar el correo. Verifica que exista.',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};

const onChangePassword = async () => {
  try {
    loading.value = true;
    await authService.changePassword({
      correo: email.value,
      password: newPassword.value
    });

    $q.notify({
      color: 'positive',
      message: 'Contraseña actualizada exitosamente',
      icon: 'check'
    });

    await router.push('/auth/login');
  } catch (error: any) {
    $q.notify({
      color: 'negative',
      message: error.response?.data?.message || 'Error al cambiar la contraseña',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
body>.q-header {
  display: none;
}

.login-left {
  min-height: 100vh;
  padding: 0;
  position: relative;
  background-color: #C4122E; // Azul Rey
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

.marca-img {
  max-width: 100%;
  height: 210px;
  max-height: 210px;
}
</style>
