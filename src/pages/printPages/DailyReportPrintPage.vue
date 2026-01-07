<template>
  <div class="q-pa-md print-hide-padding">
    <!-- Header Section -->
    <div class="row items-start q-mb-lg print-header">
      <!-- Logo Area -->
      <div class="col-12 col-md-3 text-center q-pa-sm">
        <img src="img/marca.png" alt=" Levi's" style="height: 80px;" />
      </div>

      <!-- Stats Cards -->
      <div class="col-12 col-md-5">
        <div class="row q-col-gutter-sm">
          <div class="col-4">
            <q-card flat bordered class="text-center bg-grey-1" :loading="loading">
              <q-card-section class="q-pa-xs">
                <div class="text-caption text-bold">Tickets</div>
                <div class="text-h6 text-bold">{{ reportStore.stats.tickets }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card flat bordered class="text-center bg-grey-1">
              <q-card-section class="q-pa-xs">
                <div class="text-caption text-bold">Devoluciones</div>
                <div class="text-h6 text-bold">{{ reportStore.stats.devoluciones }}</div>
                <q-icon name="backspace" color="black" size="xs" class="absolute-bottom-right q-ma-xs" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card flat bordered class="text-center bg-grey-1">
              <q-card-section class="q-pa-xs">
                <div class="text-caption text-bold">Facturados</div>
                <div class="text-h6 text-bold">{{ reportStore.stats.facturados }}</div>
                <q-icon name="check_circle" color="green" size="xs" class="absolute-bottom-right q-ma-xs" />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-4">
            <q-card flat bordered class="text-center bg-grey-1">
              <q-card-section class="q-pa-xs">
                <div class="text-caption text-bold">Cliente Generico</div>
                <div class="text-h6 text-bold">{{ reportStore.stats.clienteGenerico }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card flat bordered class="text-center bg-grey-1">
              <q-card-section class="q-pa-xs">
                <div class="text-caption text-bold">Cliente Final</div>
                <div class="text-h6 text-bold">{{ reportStore.stats.clienteFinal }}</div>
                <q-icon name="person" color="black" size="xs" class="absolute-bottom-right q-ma-xs" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card flat bordered class="text-center bg-grey-1">
              <q-card-section class="q-pa-xs">
                <div class="text-caption text-bold">Cancelaciones</div>
                <div class="text-h6 text-bold">{{ reportStore.stats.cancelaciones }}</div>
                <q-icon name="cancel" color="red" size="xs" class="absolute-bottom-right q-ma-xs" />

              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- General Info -->
      <div class="col-12 col-md-4 text-right q-pl-md">
        <div class="text-h6 text-red-8 text-bold">Ventas Facturadas</div>

        <div class="row justify-end items-baseline q-mt-sm">
          <div class="text-bold q-mr-sm">Fecha :</div>
          <div>{{ reportStore.reportDate }}</div>
        </div>
        <div class="q-mb-md">
          <div class="text-bold">#Tienda : <span class="text-weight-regular">{{ storeInfo.id }}</span></div>
          <div class="text-uppercase">{{ storeInfo.name }}</div>
        </div>


        <div class="row justify-between items-center q-px-md bg-grey-2 q-py-xs rounded-borders"
          style="border-bottom: 2px solid #D32F2F;">
          <div class="text-bold">Venta Total :</div>
          <div class="text-h6 text-bold">{{ formatCurrency(totalSales) }}</div>
        </div>

        <div class="text-left q-mt-sm text-caption text-grey-9" style="font-size: 0.9em;">
          <div class="row">
            <div class="col-5 text-bold">Primera Venta :</div>
            <div class="col">{{ reportStore.stats.primeraVenta || 0 }}</div>
          </div>
          <div class="row">
            <div class="col-5 text-bold">Ultima Venta :</div>
            <div class="col">{{ reportStore.stats.ultimaVenta || 0 }}</div>
          </div>
          <div class="row">
            <div class="col-5 text-bold">Mejor Venta :</div>
            <div class="col">{{ formatCurrency(reportStore.stats.mejorVenta || 0) }}</div>
          </div>
          <div class="row">
            <div class="col-5 text-bold">Ticket Promedio :</div>
            <div class="col">{{ formatCurrency(reportStore.stats.ticketPromedio || 0) }}</div>
          </div>
        </div>

      </div>
    </div>

    <q-separator color="red-8" size="3px" class="q-mb-md" />

    <!-- Data Table -->
    <q-table flat bordered :rows="reportStore.rows" :columns="columns" :loading="loading" row-key="ticket" hide-bottom
      :pagination="{ rowsPerPage: 0 }" class="print-table sticky-header-table" dense>
      <template v-slot:header="props">
        <q-tr :props="props" class="bg-grey-3 text-bold">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-black">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-montoTicket="props">
        <q-td :props="props" class="text-right">
          {{ formatCurrency(props.value) }}
        </q-td>
      </template>

      <template v-slot:body-cell-tipo="props">
        <q-td :props="props" class="text-center">
          <q-icon v-if="props.value === 'verified'" name="check_circle" color="light-green-6" size="sm" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { useReportsStore } from 'src/stores/reports-store';
import { ref, onMounted } from 'vue';
const reportStore = useReportsStore();
const loading = ref(false);

const storeInfo = ref({
  id: '60401',
  name: 'LEVIS GALERIAS MONTERREY'
});

const totalSales = ref(0);

const columns = [
  { name: 'ticket', label: 'Ticket', field: 'ticket' },
  { name: 'fechaVenta', label: 'FechaVenta', field: 'fechaVenta' },
  { name: 'montoTicket', label: 'Monto Ticket', field: 'montoTicket' },
  { name: 'folioFiscal', label: 'FolioFiscal', field: 'folioFiscal' },
  { name: 'fechaTimbrado', label: 'FechaTimbrado', field: 'fechaTimbrado' },
  { name: 'receptor', label: 'Receptor', field: 'receptor' },
  { name: 'tipo', label: 'Tipo', field: 'tipo' }
];

// Utilities
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
onMounted(() => {
  setTimeout(() => {
    window.print();
  }, 500);
});
</script>

<style>
@media print {
  .print-hide-padding {
    padding: 0 !important;
  }

  /* Hide sidebar and other layout elements if necessary - usually handled by layout config or specific classes */
  .q-drawer,
  .q-header,
  .q-footer {
    display: none !important;
  }

  body {
    background: white;
  }
}

.sticky-header-table {
  /* height: 500px; */
}
</style>
