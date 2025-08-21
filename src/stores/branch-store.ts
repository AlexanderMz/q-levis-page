import { defineStore, acceptHMRUpdate } from 'pinia';
import { branchService } from 'src/services/api';

export interface Branch {
  _id: string,
  sucursal: string,
  numero: string,
  cp: string,
  estado: string,
  municipio: string,
  colonia: string,
  calle: string,
  local?: string,
  referencia: string,
}


export const useBranchStore = defineStore('branchStore', {
  state: () => ({
    branches: [] as Branch[],
    cargando: false,
    error: null as string | null
  }),

  getters: {
    obtenerBranches: (state) => state.branches,
    estaCargando: (state) => state.cargando,
    obtenerError: (state) => state.error
  },

  actions: {
    async cargarBranches () {
      try {
        this.cargando = true;
        this.error = null;
        const data = await branchService.getBranches();
        this.branches = data;
      } catch (error) {
        console.error('Error al cargar branches:', error);
        this.error = 'Error al cargar los branches';
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    limpiarError () {
      this.error = null;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBranchStore, import.meta.hot));
}
