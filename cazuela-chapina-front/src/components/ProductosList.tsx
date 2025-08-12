import React from 'react';
import { Product } from '../types';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Chip
} from '@mui/material';

interface ProductosListProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

const ProductosList: React.FC<ProductosListProps> = ({ 
  products, 
  onEdit, 
  onDelete 
}) => {
  const getTipoColor = (tipo: string) => {
    switch(tipo) {
      case 'bebida': return 'primary';
      case 'tamal': return 'secondary';
      case 'combo': return 'success';
      default: return 'default';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Productos
      </Typography>
      
      {products.length === 0 ? (
        <Typography variant="body1">No hay productos registrados</Typography>
      ) : (
        <List>
          {products.map((product) => (
            <ListItem 
              key={product.id}
              secondaryAction={
                <>
                  {onEdit && (
                    <Chip 
                      label="Editar" 
                      color="info" 
                      onClick={() => onEdit(product)}
                      sx={{ mr: 1 }}
                    />
                  )}
                  {onDelete && (
                    <Chip 
                      label="Eliminar" 
                      color="error" 
                      onClick={() => onDelete(product.id)}
                    />
                  )}
                </>
              }
            >
              <ListItemText
                primary={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      label={product.tipo.toUpperCase()} 
                      color={getTipoColor(product.tipo)} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    {product.nombre}
                  </div>
                }
                secondary={
                  <>
                    <div>Precio: Q{product.precio.toFixed(2)}</div>
                    {product.tamaño && <div>Tamaño: {product.tamaño}</div>}
                    <div>{product.descripcion}</div>
                    {product.atributos && (
                      <div style={{ marginTop: '8px' }}>
                        {product.atributos.endulzante && (
                          <Chip 
                            label={`Endulzante: ${product.atributos.endulzante}`} 
                            size="small" 
                            sx={{ mr: 1 }}
                          />
                        )}
                        {product.atributos.topping && (
                          <Chip 
                            label={`Topping: ${product.atributos.topping}`} 
                            size="small" 
                            sx={{ mr: 1 }}
                          />
                        )}
                      </div>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default ProductosList;