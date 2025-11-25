import { defineStore, acceptHMRUpdate } from 'pinia';
import { ticketService } from 'src/services/api';

export interface Ticket {
  _id: string;
  tienda: string;
  noTicket: string;
  noSucursal: string;
  monto: number;
  fecha?: string;
}

interface DatosTicket {
  tienda: string;
  noTicket: string;
  noSucursal: string;
  monto: number;
}
type queryParams = Pick<DatosTicket, 'noTicket' | 'noSucursal'>
export const useTicketStore = defineStore('ticketStore', {
  state: () => ({
    tickets: [] as Ticket[],
    cargando: false,
    error: '' as string
  }),

  getters: {
    obtenerTickets: (state) => state.tickets,
    estaCargando: (state) => state.cargando,
    obtenerError: (state) => state.error
  },

  actions: {
    async cargarTickets () {
      try {
        this.cargando = true;
        this.error = '';
        const data = await ticketService.getTickets();
        this.tickets = data;
      } catch (error) {
        console.error('Error al cargar tickets:', error);
        this.error = 'Error al cargar los tickets';
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async buscarTickets (params: queryParams) {
      try {
        this.cargando = true;
        this.error = '';
        const data = await ticketService.getTicket(params);
        this.tickets.push(data.data)
      } catch (error) {
        this.error = 'Error al cargar los ticket (no encontrado).';
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async crearTicket (datosTicket: DatosTicket) {
      try {
        this.cargando = true;
        this.error = '';
        const data = await ticketService.createTicket(datosTicket);
        this.tickets.push(data);
        return data;
      } catch (error) {
        console.error('Error al crear ticket:', error);
        this.error = 'Error al crear el ticket';
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    limpiarError () {
      this.error = '';
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTicketStore, import.meta.hot));
}
