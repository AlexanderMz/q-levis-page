<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg" style="max-width: 900px; margin: auto;">
      <div class="row items-center q-mb-md">
        <div class="col">
          <div class="text-h4 text-bold text-center">Perfil de Usuario</div>
        </div>
        <div class="col-auto">
          <q-btn @click="$router.go(-1)" round icon="arrow_back" color="red-7" />
        </div>
      </div>

      <q-tabs v-model="tab" class="text-primary" active-color="red-7" indicator-color="red-7" align="justify"
        narrow-indicator>
        <q-tab name="profile" label="Datos Personales" />
        <q-tab name="password" label="Cambiar Contraseña" />
      </q-tabs>

      <q-separator class="q-my-md" />

      <q-tab-panels v-model="tab" animated>
        <!-- Panel de Datos Personales -->
        <q-tab-panel name="profile">
          <q-form @submit.prevent="actualizarPerfil">
            <div class="row q-col-gutter-md">
              <!-- Columna izquierda -->
              <div class="col-12 col-md-6">
                <q-input v-model="form.rfc" label="RFC" filled dense class="q-mb-md" :error="!!errors.rfc"
                  :error-message="errors.rfc" />
                <q-select :options="invoiceStore.obtenerOptRegimenFiscal" emit-value map-options
                  v-model="form.regimenFiscal" label="Régimen Fiscal" filled dense class="q-mb-md"
                  :error="!!errors.regimenFiscal" :error-message="errors.regimenFiscal" />
                <q-select :options="invoiceStore.obtenerOptUsoCfdi" emit-value map-options v-model="form.usoCfdi"
                  label="Uso CFDI" filled dense class="q-mb-md" :error="!!errors.usoCfdi"
                  :error-message="errors.usoCfdi" />
                <q-input v-model="form.calle" label="Calle" filled dense class="q-mb-md" :error="!!errors.calle"
                  :error-message="errors.calle" />
                <q-input v-model="form.numeroInterior" label="Número Interior" filled dense class="q-mb-md" />
                <q-input v-model="form.delegacion" label="Delegación/Mpio." filled dense class="q-mb-md"
                  :error="!!errors.delegacion" :error-message="errors.delegacion" />
                <q-input v-model="form.estado" label="Estado" filled dense class="q-mb-md" :error="!!errors.estado"
                  :error-message="errors.estado" />
                <q-input v-model="form.pais" label="País" filled dense class="q-mb-md" :error="!!errors.pais"
                  :error-message="errors.pais" />
              </div>
              <!-- Columna derecha -->
              <div class="col-12 col-md-6">
                <q-input v-model="form.razonSocial" label="Nombre o Razón Social" filled dense class="q-mb-md"
                  :error="!!errors.razonSocial" :error-message="errors.razonSocial" />
                <q-input v-model="form.formaPago" label="Forma de Pago" filled dense class="q-mb-md"
                  :error="!!errors.formaPago" :error-message="errors.formaPago" />
                <q-input v-model="form.correo" label="Correo" filled dense class="q-mb-md" :error="!!errors.correo"
                  :error-message="errors.correo" />
                <q-input v-model="form.numeroExterior" label="Número Exterior" filled dense class="q-mb-md"
                  :error="!!errors.numeroExterior" :error-message="errors.numeroExterior" />
                <q-input v-model="form.colonia" label="Colonia" filled dense class="q-mb-md" :error="!!errors.colonia"
                  :error-message="errors.colonia" />
                <q-input v-model="form.ciudad" label="Ciudad" filled dense class="q-mb-md" :error="!!errors.ciudad"
                  :error-message="errors.ciudad" />
                <q-input v-model="form.codigoPostal" label="Código Postal" filled dense class="q-mb-md"
                  :error="!!errors.codigoPostal" :error-message="errors.codigoPostal" />
              </div>
            </div>
            <div class="row q-mt-lg">
              <div class="col-12 flex flex-end">
                <q-btn color="red-7" label="Guardar Cambios" class="q-mt-md" unelevated rounded type="submit"
                  style="min-width: 250px;" :loading="loading" />
              </div>
            </div>
          </q-form>
        </q-tab-panel>

        <!-- Panel de Cambio de Contraseña -->
        <q-tab-panel name="password">
          <q-form @submit.prevent="cambiarContraseña">
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input v-model="passwordForm.currentPassword" label="Contraseña Actual" type="password" filled dense
                  class="q-mb-md" :error="!!errors.currentPassword" :error-message="errors.currentPassword" />
                <q-input v-model="passwordForm.newPassword" label="Nueva Contraseña" type="password" filled dense
                  class="q-mb-md" :error="!!errors.newPassword" :error-message="errors.newPassword" />
                <q-input v-model="passwordForm.confirmPassword" label="Confirmar Nueva Contraseña" type="password"
                  filled dense class="q-mb-md" :error="!!errors.confirmPassword"
                  :error-message="errors.confirmPassword" />
              </div>
            </div>
            <div class="row q-mt-lg">
              <div class="col-12 flex flex-end">
                <q-btn color="red-7" label="Cambiar Contraseña" class="q-mt-md" unelevated rounded type="submit"
                  style="min-width: 250px;" :loading="passwordLoading" />
              </div>
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore, useInvoiceStore } from 'src/stores';

const $q = useQuasar();
const userStore = useUserStore();
const invoiceStore = useInvoiceStore();
const tab = ref('profile');
const loading = ref(false);
const passwordLoading = ref(false);


// Formulario principal
const form = ref({
  rfc: '',
  regimenFiscal: '',
  usoCfdi: '',
  calle: '',
  numeroInterior: '',
  delegacion: '',
  estado: '',
  pais: '',
  razonSocial: '',
  formaPago: '',
  correo: '',
  numeroExterior: '',
  colonia: '',
  ciudad: '',
  codigoPostal: ''
});

// Formulario de contraseña
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Errores del formulario principal
interface ErrorMessages {
  rfc: string;
  regimenFiscal: string;
  usoCfdi: string;
  calle: string;
  delegacion: string;
  estado: string;
  pais: string;
  razonSocial: string;
  formaPago: string;
  correo: string;
  numeroExterior: string;
  colonia: string;
  ciudad: string;
  codigoPostal: string;
  [key: string]: string;
}

// Errores del formulario de contraseña
interface PasswordErrorMessages {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  [key: string]: string;
}

const errors = reactive<ErrorMessages>({
  rfc: '',
  regimenFiscal: '',
  usoCfdi: '',
  calle: '',
  delegacion: '',
  estado: '',
  pais: '',
  razonSocial: '',
  formaPago: '',
  correo: '',
  numeroExterior: '',
  colonia: '',
  ciudad: '',
  codigoPostal: ''
});

const passwordErrors = reactive<PasswordErrorMessages>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Cargar datos del usuario al montar el componente
onMounted(async () => {
  try {
    loading.value = true;
    await userStore.cargarPerfil();

    // Precargar el formulario con los datos del usuario
    if (userStore.usuario) {
      form.value = {
        rfc: userStore.usuario.rfc || '',
        regimenFiscal: userStore.usuario.regimenFiscal || '',
        usoCfdi: userStore.usuario.usoCfdi || '',
        calle: userStore.usuario.direccion?.calle || '',
        numeroInterior: userStore.usuario.direccion?.numeroInterior || '',
        delegacion: userStore.usuario.direccion?.delegacion || '',
        estado: userStore.usuario.direccion?.estado || '',
        pais: userStore.usuario.direccion?.pais || '',
        razonSocial: userStore.usuario.razonSocial || '',
        formaPago: userStore.usuario.formaPago || '',
        correo: userStore.usuario.correo || '',
        numeroExterior: userStore.usuario.direccion?.numeroExterior || '',
        colonia: userStore.usuario.direccion?.colonia || '',
        ciudad: userStore.usuario.direccion?.ciudad || '',
        codigoPostal: userStore.usuario.direccion?.codigoPostal || ''
      };
    }
  } catch (error) {
    console.error('Error al cargar el perfil:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al cargar los datos del perfil',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
});

// Validar formulario principal
function validateForm () {
  let isValid = true;

  // Limpiar errores previos
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });

  // Validaciones básicas
  if (!form.value.rfc) {
    errors.rfc = 'El RFC es requerido';
    isValid = false;
  }

  if (!form.value.regimenFiscal) {
    errors.regimenFiscal = 'El régimen fiscal es requerido';
    isValid = false;
  }

  if (!form.value.usoCfdi) {
    errors.usoCfdi = 'El uso CFDI es requerido';
    isValid = false;
  }

  if (!form.value.razonSocial) {
    errors.razonSocial = 'El nombre o razón social es requerido';
    isValid = false;
  }

  if (!form.value.formaPago) {
    errors.formaPago = 'La forma de pago es requerida';
    isValid = false;
  }

  if (!form.value.correo) {
    errors.correo = 'El correo es requerido';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.correo)) {
    errors.correo = 'Ingresa un correo válido';
    isValid = false;
  }

  if (!form.value.calle) {
    errors.calle = 'La calle es requerida';
    isValid = false;
  }

  if (!form.value.numeroExterior) {
    errors.numeroExterior = 'El número exterior es requerido';
    isValid = false;
  }

  if (!form.value.colonia) {
    errors.colonia = 'La colonia es requerida';
    isValid = false;
  }

  if (!form.value.delegacion) {
    errors.delegacion = 'La delegación es requerida';
    isValid = false;
  }

  if (!form.value.estado) {
    errors.estado = 'El estado es requerido';
    isValid = false;
  }

  if (!form.value.ciudad) {
    errors.ciudad = 'La ciudad es requerida';
    isValid = false;
  }

  if (!form.value.codigoPostal) {
    errors.codigoPostal = 'El código postal es requerido';
    isValid = false;
  }

  if (!form.value.pais) {
    errors.pais = 'El país es requerido';
    isValid = false;
  }

  return isValid;
}

// Validar formulario de contraseña
function validatePasswordForm () {
  let isValid = true;

  // Limpiar errores previos
  Object.keys(passwordErrors).forEach(key => {
    passwordErrors[key] = '';
  });

  if (!passwordForm.value.currentPassword) {
    passwordErrors.currentPassword = 'La contraseña actual es requerida';
    isValid = false;
  }

  if (!passwordForm.value.newPassword) {
    passwordErrors.newPassword = 'La nueva contraseña es requerida';
    isValid = false;
  } else if (passwordForm.value.newPassword.length < 8) {
    passwordErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    isValid = false;
  }

  if (!passwordForm.value.confirmPassword) {
    passwordErrors.confirmPassword = 'Confirma tu nueva contraseña';
    isValid = false;
  } else if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordErrors.confirmPassword = 'Las contraseñas no coinciden';
    isValid = false;
  }

  return isValid;
}

// Actualizar perfil
async function actualizarPerfil () {
  if (!validateForm()) {
    return;
  }

  try {
    loading.value = true;

    const userData = {
      rfc: form.value.rfc,
      usoCfdi: form.value.usoCfdi,
      razonSocial: form.value.razonSocial,
      regimenFiscal: form.value.regimenFiscal,
      formaPago: form.value.formaPago,
      correo: form.value.correo,
      direccion: {
        calle: form.value.calle,
        numeroExterior: form.value.numeroExterior,
        numeroInterior: form.value.numeroInterior,
        colonia: form.value.colonia,
        delegacion: form.value.delegacion,
        ciudad: form.value.ciudad,
        estado: form.value.estado,
        codigoPostal: form.value.codigoPostal,
        pais: form.value.pais
      }
    };

    await userStore.actualizarPerfil(userData);

    $q.notify({
      color: 'positive',
      message: 'Perfil actualizado correctamente',
      icon: 'check'
    });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al actualizar el perfil',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
}

// Cambiar contraseña
async function cambiarContraseña () {
  if (!validatePasswordForm()) {
    return;
  }

  try {
    passwordLoading.value = true;

    // Aquí se implementaría la llamada a la API para cambiar la contraseña
    // Por ahora, simulamos una respuesta exitosa
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Limpiar el formulario
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    $q.notify({
      color: 'positive',
      message: 'Contraseña actualizada correctamente',
      icon: 'check'
    });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al cambiar la contraseña',
      icon: 'error'
    });
  } finally {
    passwordLoading.value = false;
  }
}
</script>
