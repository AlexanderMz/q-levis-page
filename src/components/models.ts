export interface Ticket {
  _id: string;
  tienda: string;
  noTicket: string;
  noSucursal: string;
  monto: number;
  fecha?: string;
}

export interface Meta {
  totalCount: number;
}
