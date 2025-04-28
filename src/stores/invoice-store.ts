import { defineStore, acceptHMRUpdate } from 'pinia';
import { invoiceService } from 'src/services/api';

interface Factura {
    id: string;
    folio: string;
    uuid: string;
    monto: number;
    fecha: string;
    pdfUrl?: string;
    xmlUrl?: string;
}

interface DatosFactura {
    tickets: string[];
    datosFiscales: {
        rfc: string;
        usoCfdi: string;
        razonSocial: string;
        regimenFiscal: string;
        formaPago: string;
        direccion: {
            calle: string;
            numeroExterior: string;
            colonia: string;
            delegacion: string;
            cp: string;
            pais: string;
        };
        correo: string;
    };
}

export const useInvoiceStore = defineStore('invoiceStore', {
    state: () => ({
        facturas: [] as Factura[],
        facturaActual: null as Factura | null,
        cargando: false,
        error: null as string | null
    }),

    getters: {
        obtenerFacturas: (state) => state.facturas,
        obtenerFacturaActual: (state) => state.facturaActual,
        estaCargando: (state) => state.cargando,
        obtenerError: (state) => state.error
    },

    actions: {
        async cargarFacturas () {
            try {
                this.cargando = true;
                this.error = null;
                const data = await invoiceService.getInvoices();
                this.facturas = data;
            } catch (error) {
                console.error('Error al cargar facturas:', error);
                this.error = 'Error al cargar las facturas';
                throw error;
            } finally {
                this.cargando = false;
            }
        },

        async obtenerFacturaPorId (id: string) {
            try {
                this.cargando = true;
                this.error = null;
                const data = await invoiceService.getInvoiceById(id);
                this.facturaActual = data;
                return data;
            } catch (error) {
                console.error('Error al obtener factura:', error);
                this.error = 'Error al obtener la factura';
                throw error;
            } finally {
                this.cargando = false;
            }
        },

        async crearFactura (datosFactura: DatosFactura) {
            try {
                this.cargando = true;
                this.error = null;
                const data = await invoiceService.createInvoice(datosFactura);
                this.facturas.unshift(data);
                return data;
            } catch (error) {
                console.error('Error al crear factura:', error);
                this.error = 'Error al crear la factura';
                throw error;
            } finally {
                this.cargando = false;
            }
        },

        async descargarPdf (id: string) {
            try {
                this.cargando = true;
                this.error = null;
                const blob = await invoiceService.downloadPdf(id);
                return blob;
            } catch (error) {
                console.error('Error al descargar PDF:', error);
                this.error = 'Error al descargar el PDF';
                throw error;
            } finally {
                this.cargando = false;
            }
        },

        async descargarXml (id: string) {
            try {
                this.cargando = true;
                this.error = null;
                const blob = await invoiceService.downloadXml(id);
                return blob;
            } catch (error) {
                console.error('Error al descargar XML:', error);
                this.error = 'Error al descargar el XML';
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
    import.meta.hot.accept(acceptHMRUpdate(useInvoiceStore, import.meta.hot));
}
