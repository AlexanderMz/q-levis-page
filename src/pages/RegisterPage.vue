<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg" style="max-width: 900px; margin: auto;">
      <div class="row items-center q-mb-md">
        <div class="col">
          <div class="text-h5 text-bold text-center">Registro de Clientes</div>
        </div>
        <div class="col-auto">
          <q-btn @click="$router.go(-1)" round icon="arrow_back" text-color="primary" color="dark" />
        </div>
      </div>
      <q-form @submit.prevent="onSubmit">
        <div class="row q-col-gutter-md">
          <!-- Columna izquierda -->
          <div class="col-12 col-md-6">
            <q-input v-model="form.rfc" label="RFC" filled dense class="q-mb-md" :error="!!errors.rfc"
              :error-message="errors.rfc" />
            <q-input v-model="form.regimenFiscal" label="Régimen Fiscal" filled dense class="q-mb-md"
              :error="!!errors.regimenFiscal" :error-message="errors.regimenFiscal" />
            <q-input v-model="form.usoCfdi" label="Uso CFDI" filled dense class="q-mb-md" :error="!!errors.usoCfdi"
              :error-message="errors.usoCfdi" />
            <q-input v-model="form.password" label="Contraseña" type="password" filled dense class="q-mb-md"
              :error="!!errors.password" :error-message="errors.password" />
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
            <q-input v-model="form.confirmPassword" label="Confirmar Contraseña" type="password" filled dense
              class="q-mb-md" :error="!!errors.confirmPassword" :error-message="errors.confirmPassword" />
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
            <q-btn color="red-7" label="Registrarse" class="q-mt-md" unelevated rounded type="submit"
              style="min-width: 250px;" :loading="loading" />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { authService } from 'src/services/api';

const router = useRouter();
const $q = useQuasar();
const loading = ref(false);

const form = ref({
  rfc: '',
  regimenFiscal: '',
  usoCfdi: '',
  password: '',
  confirmPassword: '',
  razonSocial: '',
  formaPago: '',
  correo: '',
  calle: '',
  numeroInterior: '',
  numeroExterior: '',
  colonia: '',
  delegacion: '',
  ciudad: '',
  estado: '',
  codigoPostal: '',
  pais: ''
});

interface ErrorMessages {
  rfc: string;
  regimenFiscal: string;
  usoCfdi: string;
  password: string;
  confirmPassword: string;
  razonSocial: string;
  formaPago: string;
  correo: string;
  calle: string;
  numeroExterior: string;
  colonia: string;
  delegacion: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
  [key: string]: string;
}

const errors = reactive<ErrorMessages>({
  rfc: '',
  regimenFiscal: '',
  usoCfdi: '',
  password: '',
  confirmPassword: '',
  razonSocial: '',
  formaPago: '',
  correo: '',
  calle: '',
  numeroExterior: '',
  colonia: '',
  delegacion: '',
  ciudad: '',
  estado: '',
  codigoPostal: '',
  pais: ''
});

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

  if (!form.value.password) {
    errors.password = 'La contraseña es requerida';
    isValid = false;
  }

  if (!form.value.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña';
    isValid = false;
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
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

  if (!form.value.ciudad) {
    errors.ciudad = 'La ciudad es requerida';
    isValid = false;
  }

  if (!form.value.estado) {
    errors.estado = 'El estado es requerido';
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

async function onSubmit () {
  if (!validateForm()) {
    return;
  }

  try {
    loading.value = true;

    // Preparar datos para el registro
    const userData = {
      rfc: form.value.rfc,
      regimenFiscal: form.value.regimenFiscal,
      usoCfdi: form.value.usoCfdi,
      password: form.value.password,
      razonSocial: form.value.razonSocial,
      formaPago: form.value.formaPago,
      correo: form.value.correo,
      direccion: {
        calle: form.value.calle,
        numeroInterior: form.value.numeroInterior,
        numeroExterior: form.value.numeroExterior,
        colonia: form.value.colonia,
        delegacion: form.value.delegacion,
        ciudad: form.value.ciudad,
        estado: form.value.estado,
        codigoPostal: form.value.codigoPostal,
        pais: form.value.pais
      }
    };

    await authService.register(userData);

    $q.notify({
      color: 'positive',
      message: 'Registro exitoso. Ahora puedes iniciar sesión.',
      icon: 'check'
    });

    // Redirigir al login
    await router.push('/auth/login');
  } catch (error) {
    console.error('Error en el registro:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al registrarse. Intenta nuevamente.',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
}
</script>
