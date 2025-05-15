<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class=" q-pa-lg" style="max-width: 1100px; margin: auto;">
      <div class="row items-center q-mb-md">
        <div class="col">
          <div class="text-h3 text-bold text-center">Consultar Factura</div>
        </div>
        <div class="col-auto">
          <q-btn @click="$router.go(-1)" round icon="arrow_back" text-color="primary" color="dark" />
        </div>
      </div>
      <q-card-section>
        <div class="row q-col-gutter-md q-mb-md justify-center">
          <div class="col-3 text-h5">
            No. Ticket / Sucursal:
          </div>
          <div class="col-7">
            <q-input rounded standout v-model="text" placeholder="Ticker/Sucursal" class="q-mb-md" />
          </div>
          <div class="col-auto">
            <q-btn color="primary" class="full-width" label="Consultar" unelevated rounded />
          </div>
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const text = ref('');
//
</script>
