import { defineStore, acceptHMRUpdate } from 'pinia';
import { useUserStore } from './user-store';
import { authService } from 'src/services/api';

interface Credenciales {
  correo: string;
  password: string;
}

interface RegistroUsuario {
  rfc: string;
  regimenFiscal: string;
  usoCfdi: string;
  password: string;
  confirmPassword: string;
  razonSocial: string;
  formaPago: string;
  correo: string;
  calle: string;
  numeroInterior?: string;
  numeroExterior: string;
  colonia: string;
  delegacion: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    cargando: false,
    error: null as string | null,
    token: null as string | null,
  }),

  getters: {
    estaAutenticado: (state) => !!state.token,
    obtenerError: (state) => state.error,
    estaCargando: (state) => state.cargando,
  },

  actions: {
    async iniciarSesion (credenciales: Credenciales) {
      try {
        this.cargando = true;
        this.error = null;

        const respuesta = await authService.login(credenciales);
        this.token = respuesta.token;

        // Obtener información del usuario
        const userStore = useUserStore();
        userStore.establecerUsuario({
          id: respuesta.user.id,
          nombre: respuesta.user.razonSocial || respuesta.user.email,
          email: respuesta.user.email,
          fechaRegistro: new Date(respuesta.user.createdAt),
          activo: true
        });
      } catch (error) {
        this.error = 'Error al iniciar sesión';
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async registrarUsuario (datos: RegistroUsuario) {
      try {
        this.cargando = true;
        this.error = null;

        if (datos.password !== datos.confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }

        // Preparar datos para el registro
        const userData = {
          rfc: datos.rfc,
          regimenFiscal: datos.regimenFiscal,
          usoCfdi: datos.usoCfdi,
          password: datos.password,
          razonSocial: datos.razonSocial,
          formaPago: datos.formaPago,
          correo: datos.correo,
          direccion: {
            calle: datos.calle,
            numeroInterior: datos.numeroInterior,
            numeroExterior: datos.numeroExterior,
            colonia: datos.colonia,
            delegacion: datos.delegacion,
            ciudad: datos.ciudad,
            estado: datos.estado,
            codigoPostal: datos.codigoPostal,
            pais: datos.pais
          }
        };

        await authService.register(userData);
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al registrar usuario';
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    cerrarSesion () {
      authService.logout();
      this.token = null;
      const userStore = useUserStore();
      userStore.limpiarUsuario();
    },

    limpiarError () {
      this.error = null;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
