<template>
  <q-page class="q-pa-none bg-white">
    <!-- Banner principal -->
    <div class="q-mb-xl" style="background: #b48ba5; padding: 48px 0; text-align: center;">
      <div class="text-h2 text-white" style="font-family: serif; letter-spacing: 2px;">
        DÍA DE LAS MADRES
      </div>
      <div class="text-h1 text-white text-bold" style="margin-top: 12px;">
        30% OFF + 6MSI
      </div>
    </div>

    <!-- Productos destacados -->
    <div class="row q-col-gutter-xl q-px-xl q-mb-xl">
      <!-- Producto 1 -->
      <div class="col-12 col-md-4 flex flex-center">
        <q-card flat bordered class="q-pa-md" style="width: 100%; max-width: 320px;">
          <div class="absolute-top-left q-pa-xs" style="background: #c10015; color: white; border-radius: 4px;">
            -30%
          </div>
          <q-img src="https://lsco.scene7.com/is/image/lsco/852230008-front-pdp?fmt=jpeg&qlt=70,1&wid=480&hei=640"
            style="height: 320px; object-fit: contain;" />
          <div class="q-mt-md text-subtitle1">Pantalón Off Duty Joggers Levi's®</div>
          <div class="q-mb-xs">
            <q-rating size="20px" :max="5" color="grey-5" v-model="rating1" readonly />
            <span class="text-grey-6">(0)</span>
          </div>
          <div class="text-grey-6" style="text-decoration: line-through;">$1,499.00</div>
          <div class="text-h6 text-negative text-bold">$1,049.00</div>
        </q-card>
      </div>
      <!-- Producto 2 -->
      <div class="col-12 col-md-4 flex flex-center">
        <q-card flat bordered class="q-pa-md" style="width: 100%; max-width: 320px;">
          <div class="absolute-top-left q-pa-xs" style="background: #c10015; color: white; border-radius: 4px;">
            -30%
          </div>
          <q-img src="https://lsco.scene7.com/is/image/lsco/A74990000-front-pdp?fmt=jpeg&qlt=70,1&wid=480&hei=640"
            style="height: 320px; object-fit: contain;" />
          <div class="q-mt-md text-subtitle1">Vestido Amaya Tiered Maxi Levi's®</div>
          <div class="q-mb-xs">
            <q-rating size="20px" :max="5" color="grey-5" v-model="rating2" readonly />
            <span class="text-grey-6">(0)</span>
          </div>
          <div class="text-grey-6" style="text-decoration: line-through;">$1,799.00</div>
          <div class="text-h6 text-negative text-bold">$1,259.00</div>
        </q-card>
      </div>
      <!-- Imagen promocional -->
      <div class="col-12 col-md-4 flex flex-center">
        <q-card flat bordered class="q-pa-md flex flex-center"
          style="width: 100%; max-width: 320px; background: #b48ba5;">
          <q-img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
            style="height: 320px; object-fit: cover; filter: grayscale(1) contrast(1.2) opacity(0.7);" />
          <div class="absolute-bottom text-center text-white text-bold" style="width: 100%; font-size: 1.1rem;">
            ENCUENTRA EL REGALO IDEAL PARA MAMÁ
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rating1 = ref(5);
const rating2 = ref(4);
</script>