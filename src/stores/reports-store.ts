import { defineStore, acceptHMRUpdate } from 'pinia';
import { reportService } from 'src/services/api';
interface Stats {
  fecha: string;
  tickets: number;
  devoluciones: number;
  facturados: number;
  clienteGenerico: number;
  clienteFinal: number;
  cancelaciones: number;
  primeraVenta: string;
  ultimaVenta: string;
  mejorVenta: number;
  ticketPromedio: number;
  sucursal: string;
  ventaTotal: number;
}
interface SaleRecord {
  ticket: string;
  fechaVenta: string;
  montoTicket: number;
  folioFiscal: string;
  fechaTimbrado: string;
  receptor: string;
  tipo: string;
  sucursal: string;
}
export const useReportsStore = defineStore('reportsStore', {
  state: () => ({
    stats: {} as Stats,
    reportDate: '',
    totalSales: 0,
    rows: [] as SaleRecord[],
  }),
  getters: {},
  actions: {
    async fetchStats(date: string) {
      const response = await reportService.getCierreDiarioKpi(date);
      this.stats = response;
    },
    async fetchRows(date: string) {
      const response = await reportService.getCierreDiarioDetalle(date);
      this.rows = response;
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReportsStore, import.meta.hot));
}
