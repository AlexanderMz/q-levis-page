<template>
  <q-page class="q-pa-md">
    <!-- Agregar un selector de fecha -->
    <div class="row q-col-gutter-md items-center q-mb-md">
      <div class="col-4">
        <q-input v-model="reportStore.reportDate" label="Fecha" type="date" />
      </div>
      <div class="col-4"></div>
      <div class="col-2">
        <q-btn label="Generar Reporte" color="primary" :loading="loading" @click="generateReport" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useReportsStore } from 'src/stores/reports-store';
const router = useRouter();
const loading = ref(false);

const reportStore = useReportsStore();

const generateReport = async () => {
  loading.value = true;
  await reportStore.fetchStats(reportStore.reportDate);
  await reportStore.fetchRows(reportStore.reportDate);
  loading.value = false;
  openAndPrint();
};


const openAndPrint = () => {
  // Resolve the target route's full path
  const routeData = router.resolve({
    name: 'daily-report-print', // The name of your target route
  });

  // Open the new URL in a new blank window/tab
  window.open(routeData.href, '_blank');
};
</script>
