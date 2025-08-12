// Tipos para productos
export type Product = {
  id: number;
  nombre: string;
  tipo: 'bebida' | 'combo' | 'tamal';
  tamaño?: string;  
  precio: number;
  descripcion: string;
  atributos?: {
    // Para bebidas
    endulzante?: 'panela' | 'miel' | 'sin azúcar';
    topping?: 'malvaviscos' | 'canela' | 'ralladura de cacao';
    
    // Para tamales
    tipoMasa?: 'maíz amarillo' | 'maíz blanco' | 'arroz';
    relleno?: 'recado rojo de cerdo' | 'negro de pollo' | 'chipilín vegetariano' | 'mezcla estilo chuchito';
    envoltura?: 'hoja de plátano' | 'tusa de maíz';
    picante?: 'sin chile' | 'suave' | 'chapín';
  };
};

// Tipo para los combos
export type Combo = {
  id: number;
  nombre: string;
  productos: Product[];
  precioEspecial: number;
  esEstacional: boolean;
};

// Tipo para el dashboard
export type DashboardData = {
  ventasDiarias: number;
  ventasMensuales: number;
  productosPopulares: Product[];
};