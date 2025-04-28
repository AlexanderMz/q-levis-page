import axios from 'axios';

const API_URL = '/api';

// Configuración base de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Servicios de autenticación
export const authService = {
  login: async (credentials: { correo: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Servicios de usuarios
export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (userData: any) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
};

// Servicios de facturación
export const invoiceService = {
  getInvoices: async () => {
    const response = await api.get('/invoices');
    return response.data;
  },
  createInvoice: async (invoiceData: any) => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },
  getInvoiceById: async (id: string) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },
  downloadPdf: async (id: string) => {
    const response = await api.get(`/invoices/${id}/pdf`, { responseType: 'blob' });
    return response.data;
  },
  downloadXml: async (id: string) => {
    const response = await api.get(`/invoices/${id}/xml`, { responseType: 'blob' });
    return response.data;
  },
};

// Servicios de tickets
export const ticketService = {
  getTickets: async () => {
    const response = await api.get('/tickets');
    return response.data;
  },
  createTicket: async (ticketData: any) => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  },
};

export default api;
