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
    error: null as string | null,
    optUsoCfdi: [
      { value: 'G01', label: 'Adquisición de mercancías' },
      { value: 'G03', label: 'Gastos en general' },
    ],
    optRegimenFiscal: [
      { value: '601', label: 'General de Ley Personas Morales' },
      { value: '603', label: 'Personas Morales con Fines no Lucrativos' },
      { value: '605', label: 'Sueldos y Salarios e Ingresos Asimilados a Salarios' },
      { value: '606', label: 'Arrendamiento' },
      { value: '607', label: 'Régimen de Enajenación o Adquisición de Bienes' },
      { value: '608', label: 'Demás ingresos' },
      { value: '609', label: 'Consolidación' },
      { value: '610', label: 'Residentes en el Extranjero sin Establecimiento Permanente en México' },
      { value: '611', label: 'Ingresos por Dividendos (socios y accionistas)' },
      { value: '612', label: 'Personas Físicas con Actividades Empresariales y Profesionales' },
      { value: '614', label: 'Ingresos por intereses' },
      { value: '615', label: 'Régimen de los ingresos por obtención de premios' },
      { value: '616', label: 'Sin obligaciones fiscales' },
      { value: '620', label: 'Sociedades Cooperativas de Producción que optan por diferir sus ingresos' },
      { value: '621', label: 'Incorporación Fiscal' },
      { value: '622', label: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
      { value: '623', label: 'Opcional para Grupos de Sociedades' },
      { value: '624', label: 'Coordinados' },
      { value: '625', label: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas' },
      { value: '626', label: 'Régimen Simplificado de Confianza' },
      { value: '628', label: 'Hidrocarburos' },
      { value: '629', label: 'De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales' },
      { value: '630', label: 'Enajenación de acciones en bolsa de valores' }
    ]
  }),

  getters: {
    obtenerFacturas: (state) => state.facturas,
    obtenerFacturaActual: (state) => state.facturaActual,
    estaCargando: (state) => state.cargando,
    obtenerError: (state) => state.error,
    obtenerOptUsoCfdi: (state) => state.optUsoCfdi,
    obtenerOptRegimenFiscal: (state) => state.optRegimenFiscal
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
