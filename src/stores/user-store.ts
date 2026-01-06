import { defineStore, acceptHMRUpdate } from 'pinia';
import { userService } from 'src/services/api';

interface User {
  id: string;
  nombre: string;
  email: string;
  fechaRegistro: Date;
  activo: boolean;
  rfc?: string;
  razonSocial?: string;
  regimenFiscal?: string;
  usoCfdi?: string;
  formaPago?: string;
  correo?: string;
  tipo?: string;
  direccion?: {
    calle: string;
    numeroInterior?: string;
    numeroExterior: string;
    colonia: string;
    delegacion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    cp?: string;
    pais: string;
  };
}

interface DatosUsuario {
  rfc?: string;
  razonSocial?: string;
  email?: string;
  regimenFiscal?: string;
  usoCfdi?: string;
  formaPago?: string;
  correo?: string;
  tipo?: string;
  direccion?: {
    calle: string;
    numeroInterior?: string;
    numeroExterior: string;
    colonia: string;
    delegacion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    cp?: string;
    pais: string;
  };
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    usuario: null as User | null,
    cargando: false,
    error: null as string | null,
  }),
  getters: {
    estaAutenticado: (state) => !!state.usuario,
    obtenerUsuario: (state) => state.usuario,
    estaCargando: (state) => state.cargando,
    obtenerError: (state) => state.error,
  },
  actions: {
    establecerUsuario(usuario: User | null) {
      this.usuario = usuario;
    },
    limpiarUsuario() {
      this.usuario = null;
      this.error = null;
    },
    async cargarPerfil() {
      try {
        this.cargando = true;
        this.error = null;
        const data = await userService.getProfile();

        // Convertir la respuesta a nuestro formato de usuario
        this.usuario = {
          id: data._id,
          nombre: data.razonSocial || data.email,
          email: data.email,
          fechaRegistro: new Date(data.createdAt),
          activo: true,
          rfc: data.rfc,
          razonSocial: data.razonSocial,
          regimenFiscal: data.regimenFiscal,
          usoCfdi: data.usoCfdi,
          formaPago: data.formaPago,
          correo: data.correo,
          direccion: data.direccion,
        };

        return this.usuario;
      } catch (error) {
        console.error('Error al cargar perfil:', error);
        this.error = 'Error al cargar el perfil';
        throw error;
      } finally {
        this.cargando = false;
      }
    },
    async actualizarPerfil(datos: DatosUsuario) {
      try {
        this.cargando = true;
        this.error = null;
        const data = await userService.updateProfile(datos);

        // Actualizar el usuario en el store
        if (this.usuario) {
          this.usuario = {
            ...this.usuario,
            rfc: data.rfc || this.usuario.rfc,
            razonSocial: data.razonSocial || this.usuario.razonSocial,
            regimenFiscal: data.regimenFiscal || this.usuario.regimenFiscal,
            usoCfdi: data.usoCfdi || this.usuario.usoCfdi,
            formaPago: data.formaPago || this.usuario.formaPago,
            correo: data.correo || this.usuario.correo,
            direccion: data.direccion || this.usuario.direccion,
          };
        }

        return this.usuario;
      } catch (error) {
        console.error('Error al actualizar perfil:', error);
        this.error = 'Error al actualizar el perfil';
        throw error;
      } finally {
        this.cargando = false;
      }
    },
    limpiarError() {
      this.error = null;
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
