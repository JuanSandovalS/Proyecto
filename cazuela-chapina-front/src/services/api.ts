import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
 
type Tamal = {
  id: number;
  tipoMasa: string;
  relleno: string;
  envoltura: string;
  picante: string;
};

type Producto = {
  id: number;
  nombre: string;
  tipo: 'bebida' | 'combo';
  precio: number;
  descripcion: string;
};

// Configuración de Axios
const api = axios.create({
  baseURL: 'http://localhost:5217/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Error en la respuesta:', {
        status: error.response.status,
        data: error.response.data,
        endpoint: error.config?.url
      });
    } else if (error.request) {
      console.error('Error en la solicitud:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Servicio para Tamales
export const tamalesService = {
  getAll: (): Promise<AxiosResponse<Tamal[]>> => api.get('/Tamales'),
  create: (data: Omit<Tamal, 'id'>): Promise<AxiosResponse<Tamal>> => api.post('/Tamales', data),
  update: (id: number, data: Partial<Tamal>): Promise<AxiosResponse<Tamal>> => api.put(`/Tamales/${id}`, data),
  delete: (id: number): Promise<AxiosResponse<void>> => api.delete(`/Tamales/${id}`)
};

// Servicio para Productos
export const productosService = {
  getAll: (): Promise<AxiosResponse<Producto[]>> => api.get('/Products'),
  create: (data: Omit<Producto, 'id'>): Promise<AxiosResponse<Producto>> => api.post('/Products', data),
  update: (id: number, data: Partial<Producto>): Promise<AxiosResponse<Producto>> => api.put(`/Products/${id}`, data),
  delete: (id: number): Promise<AxiosResponse<void>> => api.delete(`/Products/${id}`)
};

 export const useApi = <T,>(endpoint: string, options?: { manual?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options?.manual);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<T>(endpoint);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options?.manual) {
      fetchData();
    }
  }, [endpoint, options?.manual]);

  return { data, loading, error, refetch: fetchData };
};

 export const useTamales = () => {
  const { data, loading, error, refetch } = useApi<Tamal[]>('/Tamales');
  return {
    tamales: data,
    isLoading: loading,
    error,
    refetchTamales: refetch
  };
};
 
export const useProductos = () => {
  const { data, loading, error, refetch } = useApi<Producto[]>('/Products');
  return {
    productos: data,
    isLoading: loading,
    error,
    refetchProductos: refetch
  };
};