import { defineStore, acceptHMRUpdate } from 'pinia';
import { ticketService } from 'src/services/api';

interface Ticket {
    _id: string;
    tienda: string;
    noTicket: string;
    monto: number;
    fecha?: string;
}

interface DatosTicket {
    tienda: string;
    noTicket: string;
    noSucursal: string;
    monto: number;
}

export const useTicketStore = defineStore('ticketStore', {
    state: () => ({
        tickets: [] as Ticket[],
        cargando: false,
        error: null as string | null
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
                this.error = null;
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

        async crearTicket (datosTicket: DatosTicket) {
            try {
                this.cargando = true;
                this.error = null;
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
            this.error = null;
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTicketStore, import.meta.hot));
}
