<template>
  <q-page class="q-pa-none bg-white">
    <!-- Banner superior -->
    <div class="banner-top text-center text-bold text-white">
      ** No olvides facturar tus ticket dentro del mes **
    </div>

    <!-- Imagen de fondo principal -->
    <div class="main-image-container">
      <img src="img/index_image1.jpeg" alt="Levi's Store" class="main-image" />
    </div>

    <!-- Título de sucursales -->
    <div class="text-h5 text-center text-bold q-my-lg">Sucursales</div>

    <!-- Sucursales -->
    <div class="row q-col-gutter-xl q-px-xl q-mb-xl justify-center">
      <div v-for="i in 6" :key="i" class="col-12 col-md-4 col-lg-3 flex flex-center q-mb-xl">
        <q-card flat bordered class="q-pa-md branch-card flex flex-column items-center">
          <q-avatar size="90px" class="q-mb-md">
            <img src="img/marca.png" alt="Sucursal" />
          </q-avatar>
          <div class="text-bold text-red-7 text-center">VALLE ORIENTE MTY</div>
          <div class="text-center">
            <q-icon name="phone" color="red-7" size="18px" class="q-mr-xs" />
            +52 8117654098
          </div>
          <div class="text-center text-grey-8">MAINLINE , H125<br />VALLE ORIENTE</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// No se requiere lógica reactiva para la maqueta
</script>

<style lang="scss" scoped>
.banner-top {
  background: #C4122E;
  padding: 12px 0;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

.main-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  width: 100%;
  max-width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
}

.branch-card {
  min-width: 220px;
  max-width: 260px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  border: 1.5px solid #C4122E;
}

.text-red-7 {
  color: #C4122E !important;
}
</style>