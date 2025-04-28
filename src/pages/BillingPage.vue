<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class=" q-pa-lg" style="max-width: 1100px; margin: auto;">
      <div class="row items-center q-mb-md">
        <div class="col">
          <q-input v-model="search" placeholder="Buscar..." filled dense class="q-mr-md" style="max-width: 400px;" />
        </div>
        <div class="col-auto">
          <q-btn color="red-7" label="Nueva Factura" unelevated rounded class="q-ml-md" to="/invoice" />
        </div>
      </div>
      <q-table :rows="rows" :columns="columns" :filter="search" row-key="folio" flat bordered dense hide-bottom
        class="bg-white" style="border-radius: 12px;" :loading="loading">
        <template v-slot:body-cell-pdf="props">
          <q-td :props="props">
            <q-btn flat round icon="picture_as_pdf" color="red-7" @click="downloadPdf(props.row.id)" />
          </q-td>
        </template>
        <template v-slot:body-cell-xml="props">
          <q-td :props="props">
            <q-btn flat round icon="code" color="primary" @click="downloadXml(props.row.id)" />
          </q-td>
        </template>
        <template v-slot:no-data>
          <div class="full-width row flex-center q-pa-md text-grey-8">
            No hay facturas disponibles
          </div>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useInvoiceStore } from 'src/stores';

const $q = useQuasar();
const search = ref('');
const invoiceStore = useInvoiceStore();

// Usar getters del store
const loading = computed(() => invoiceStore.estaCargando);
const rows = computed(() => invoiceStore.obtenerFacturas);

const columns = [
  { name: 'folio', label: 'Folio', field: 'folio' },
  { name: 'uuid', label: 'UUID', field: 'uuid' },
  { name: 'monto', label: 'Monto', field: 'monto', format: (val: number) => `$${val.toFixed(2)}` },
  { name: 'fecha', label: 'Fecha', field: 'fecha', format: (val: string) => new Date(val).toLocaleDateString() },
  { name: 'pdf', label: 'PDF', field: 'pdf' },
  { name: 'xml', label: 'XML', field: 'xml' }
];

// Cargar facturas al montar el componente
onMounted(async () => {
  await loadInvoices();
});

// Función para cargar facturas desde el store
async function loadInvoices () {
  try {
    await invoiceStore.cargarFacturas();
  } catch (error) {
    console.error('Error al cargar facturas:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al cargar las facturas',
      icon: 'error'
    });
  }
}

// Función para descargar PDF
async function downloadPdf (id: string) {
  try {
    const blob = await invoiceStore.descargarPdf(id);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `factura-${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error al descargar PDF:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al descargar el PDF',
      icon: 'error'
    });
  }
}

// Función para descargar XML
async function downloadXml (id: string) {
  try {
    const blob = await invoiceStore.descargarXml(id);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `factura-${id}.xml`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error al descargar XML:', error);
    $q.notify({
      color: 'negative',
      message: 'Error al descargar el XML',
      icon: 'error'
    });
  }
}
</script>
