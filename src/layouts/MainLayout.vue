<template>
  <q-layout view="lHh Lpr lFf">
    <LevisDrawer v-if="userStore.estaAutenticado" />
    <q-header elevated>
      <q-toolbar>
        <img v-if="!userStore.estaAutenticado" src="img/marca.png" alt="Grupo Alevart" style="height: 80px;" />
        <q-toolbar-title>
          <span v-if="userStore.estaAutenticado" style="font-style: italic;">Bienvenido, {{ user?.razonSocial }}</span>
        </q-toolbar-title>
        <q-space />
        <img v-if="!userStore.estaAutenticado" src="https://lsco.vtexassets.com/arquivos/logoLsco.png"
          alt="Grupo Alevart" style="height: 60px;" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LevisDrawer from 'src/components/LevisDrawer.vue'
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref } from 'vue';
const userStore = useUserStore()
const user = ref({
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
onMounted(async () => {
  try {
    if (!userStore.estaAutenticado) return;
    await userStore.cargarPerfil();
    if (userStore.usuario) {
      user.value = {
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
    console.error(error)
  }
})
</script>

<style lang="sass">
.q-header
  background-color: transparent;
  color: $primary
</style>
