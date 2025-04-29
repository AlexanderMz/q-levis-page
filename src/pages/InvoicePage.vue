<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class=" q-pa-lg" style="max-width: 1100px; margin: auto;">
      <div class="row items-center q-mb-md">
        <div class="col">
          <div class="text-h4 text-bold text-center">Facturación Express</div>
        </div>
        <div class="col-auto">
          <q-btn @click="$router.go(-1)" round icon="arrow_back" text-color="primary" color="dark" />
        </div>
      </div>

      <div class="row q-col-gutter-md items-center q-mb-md">
        <div class="col-12 col-md-4">
          <q-input v-model="ticket" label="No. Ticket" filled dense />
        </div>
        <div class="col-12 col-md-4">
          <q-btn color="red-7" label="Agregar Ticket" class="q-mr-md" unelevated rounded @click="agregarTicket" />
          <q-btn color="red-7" label="Eliminar Ticket" unelevated rounded @click="eliminarTicket" />
        </div>
      </div>

      <q-table :rows="tickets" :columns="columns" row-key="noTicket" flat bordered dense class="q-mb-lg" hide-bottom
        style="background: #fff;">
        <template v-slot:body-cell-monto="props">
          <q-td :props="props">
            <q-input v-model="props.row.monto" dense filled type="number" min="0" style="max-width: 120px;" />
          </q-td>
        </template>
      </q-table>

      <q-form @submit.prevent="generarFactura">
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-3">
            <q-input v-model="form.rfc" label="RFC" filled dense :error="!!errors.rfc" :error-message="errors.rfc" />
          </div>
          <div class="col-12 col-md-3">
            <q-select :options="invoiceStore.obtenerOptUsoCfdi" emit-value map-options v-model="form.usoCfdi"
              label="Uso CFDI" filled dense class="q-mb-md" :error="!!errors.usoCfdi" :error-message="errors.usoCfdi" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="form.razonSocial" label="Nombre o Razón Social" filled dense :error="!!errors.razonSocial"
              :error-message="errors.razonSocial" />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-3">
            <q-select :options="invoiceStore.obtenerOptRegimenFiscal" emit-value map-options
              v-model="form.regimenFiscal" label="Régimen Fiscal" filled dense class="q-mb-md"
              :error="!!errors.regimenFiscal" :error-message="errors.regimenFiscal" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="form.formaPago" label="Forma de Pago" filled dense :error="!!errors.formaPago"
              :error-message="errors.formaPago" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="form.calle" label="Calle" filled dense :error="!!errors.calle"
              :error-message="errors.calle" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="form.numeroExterior" label="Número Exterior" filled dense :error="!!errors.numeroExterior"
              :error-message="errors.numeroExterior" />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-3">
            <q-input v-model="form.colonia" label="Colonia" filled dense :error="!!errors.colonia"
              :error-message="errors.colonia" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="form.delegacion" label="Delegación/Mpio." filled dense :error="!!errors.delegacion"
              :error-message="errors.delegacion" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="form.cp" label="*CP:" filled dense :error="!!errors.cp" :error-message="errors.cp" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="form.pais" label="País" filled dense :error="!!errors.pais"
              :error-message="errors.pais" />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <q-input v-model="form.correo" label="Correo" filled dense :error="!!errors.correo"
              :error-message="errors.correo" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="form.captcha" label="Captcha" filled dense :error="!!errors.captcha"
              :error-message="errors.captcha" />
          </div>
          <div class="col-12 col-md-3 flex flex-center">
            <q-img src="https://dummyimage.com/100x40/cccccc/000000&text=x2D68"
              style="max-width: 100px; max-height: 40px;" spinner-color="grey-5" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-btn color="red-7" label="Generar Factura" class="full-width" unelevated rounded type="submit"
              :loading="loading" />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useInvoiceStore, useTicketStore, useUserStore } from 'src/stores';

const router = useRouter();
const $q = useQuasar();
const invoiceStore = useInvoiceStore();
const ticketStore = useTicketStore();
const userStore = useUserStore();

// Usar getters del store
const loading = computed(() => invoiceStore.estaCargando || ticketStore.estaCargando || userStore.estaCargando);

const ticket = ref('');
const tickets = ref<Array<{ tienda: string; noTicket: string; monto: number }>>([]);

interface Column {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'right' | 'center';
}

const columns: Column[] = [
  { name: 'tienda', label: 'No. Tienda', field: 'tienda', align: 'left' },
  { name: 'noTicket', label: 'No. Ticket', field: 'noTicket', align: 'left' },
  { name: 'monto', label: 'Monto a Facturar', field: 'monto', align: 'right' }
];

const form = ref({
  rfc: '',
  usoCfdi: '',
  razonSocial: '',
  regimenFiscal: '',
  formaPago: '',
  calle: '',
  numeroExterior: '',
  colonia: '',
  delegacion: '',
  cp: '',
  pais: '',
  correo: '',
  captcha: ''
});

interface ErrorMessages {
  rfc: string;
  usoCfdi: string;
  razonSocial: string;
  regimenFiscal: string;
  formaPago: string;
  calle: string;
  numeroExterior: string;
  colonia: string;
  delegacion: string;
  cp: string;
  pais: string;
  correo: string;
  captcha: string;
  [key: string]: string;
}

const errors = reactive<ErrorMessages>({
  rfc: '',
  usoCfdi: '',
  razonSocial: '',
  regimenFiscal: '',
  formaPago: '',
  calle: '',
  numeroExterior: '',
  colonia: '',
  delegacion: '',
  cp: '',
  pais: '',
  correo: '',
  captcha: ''
});

// Cargar datos del usuario al montar el componente
onMounted(async () => {
  try {
    if (!userStore.estaAutenticado) return;
    // Si el usuario ya está en el store, usamos esos datos
    if (userStore.usuario) {
      cargarDatosUsuario();
    } else {
      // Si no, cargamos el perfil del usuario
      await userStore.cargarPerfil();
      cargarDatosUsuario();
    }
  } catch (error) {
    console.error('Error al cargar los datos del usuario:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al cargar los datos del usuario',
      icon: 'error'
    });
  }
});

// Función para cargar los datos del usuario en el formulario
function cargarDatosUsuario () {
  if (userStore.usuario) {
    form.value = {
      rfc: userStore.usuario.rfc || '',
      usoCfdi: userStore.usuario.usoCfdi || '',
      razonSocial: userStore.usuario.razonSocial || '',
      regimenFiscal: userStore.usuario.regimenFiscal || '',
      formaPago: userStore.usuario.formaPago || '',
      calle: userStore.usuario.direccion?.calle || '',
      numeroExterior: userStore.usuario.direccion?.numeroExterior || '',
      colonia: userStore.usuario.direccion?.colonia || '',
      delegacion: userStore.usuario.direccion?.delegacion || '',
      cp: userStore.usuario.direccion?.codigoPostal || '',
      pais: userStore.usuario.direccion?.pais || '',
      correo: userStore.usuario.correo || '',
      captcha: ''
    };
  }
}

function agregarTicket () {
  if (ticket.value) {
    tickets.value.push({
      tienda: '',
      noTicket: ticket.value,
      monto: 0
    });
    ticket.value = '';
  }
}

function eliminarTicket () {
  if (tickets.value.length > 0) {
    tickets.value.pop();
  }
}

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

  if (!form.value.usoCfdi) {
    errors.usoCfdi = 'El uso CFDI es requerido';
    isValid = false;
  }

  if (!form.value.razonSocial) {
    errors.razonSocial = 'El nombre o razón social es requerido';
    isValid = false;
  }

  if (!form.value.regimenFiscal) {
    errors.regimenFiscal = 'El régimen fiscal es requerido';
    isValid = false;
  }

  if (!form.value.formaPago) {
    errors.formaPago = 'La forma de pago es requerida';
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

  if (!form.value.cp) {
    errors.cp = 'El código postal es requerido';
    isValid = false;
  }

  if (!form.value.pais) {
    errors.pais = 'El país es requerido';
    isValid = false;
  }

  if (!form.value.correo) {
    errors.correo = 'El correo es requerido';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.correo)) {
    errors.correo = 'Ingresa un correo válido';
    isValid = false;
  }

  if (!form.value.captcha) {
    errors.captcha = 'El captcha es requerido';
    isValid = false;
  }

  if (tickets.value.length === 0) {
    $q.notify({
      color: 'negative',
      message: 'Debes agregar al menos un ticket',
      icon: 'error'
    });
    isValid = false;
  }

  return isValid;
}

async function generarFactura () {
  if (!validateForm()) {
    return;
  }

  try {
    // Primero, crear los tickets
    const ticketPromises = tickets.value.map(ticket =>
      ticketStore.crearTicket({
        tienda: ticket.tienda,
        noTicket: ticket.noTicket,
        monto: ticket.monto
      })
    );

    const createdTickets = await Promise.all(ticketPromises);

    // Luego, crear la factura con los tickets
    const invoiceData = {
      tickets: createdTickets.map(ticket => ticket._id),
      datosFiscales: {
        rfc: form.value.rfc,
        usoCfdi: form.value.usoCfdi,
        razonSocial: form.value.razonSocial,
        regimenFiscal: form.value.regimenFiscal,
        formaPago: form.value.formaPago,
        direccion: {
          calle: form.value.calle,
          numeroExterior: form.value.numeroExterior,
          colonia: form.value.colonia,
          delegacion: form.value.delegacion,
          cp: form.value.cp,
          pais: form.value.pais
        },
        correo: form.value.correo
      }
    };

    await invoiceStore.crearFactura(invoiceData);

    $q.notify({
      color: 'positive',
      message: 'Factura generada correctamente',
      icon: 'check'
    });

    // Redirigir a la página de facturas
    await router.push('/billing');
  } catch (error) {
    console.error('Error al generar factura:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al generar la factura. Intenta nuevamente.',
      icon: 'error'
    });
  }
}
</script>
