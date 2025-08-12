import { useState, useEffect } from 'react';
import { productosService } from '../services/api';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

type TipoProducto = "bebida" | "combo";

type Producto = {
  id: number;
  nombre: string;
  tipo: TipoProducto;
  precio: number;
  descripcion: string;
};

type ProductoForm = {
  nombre: string;
  tipo: TipoProducto;
  precio: number;
  descripcion: string;
};

const ProductosPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Producto | null>(null);
  const [formData, setFormData] = useState<ProductoForm>({
    nombre: '',
    tipo: 'bebida',
    precio: 0,
    descripcion: ''
  });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    const response = await productosService.getAll();
    setProductos(response.data);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const name = e.target.name as keyof ProductoForm;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProduct) {
      await productosService.update(currentProduct.id, formData);
    } else {
      await productosService.create(formData);
    }
    
    await loadProductos();
    handleCloseDialog();
  };

  const handleEdit = (producto: Producto) => {
    setCurrentProduct(producto);
    setFormData({
      nombre: producto.nombre,
      tipo: producto.tipo,
      precio: producto.precio,
      descripcion: producto.descripcion
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    await productosService.delete(id);
    await loadProductos();
  };

  const handleOpenDialog = () => {
    setCurrentProduct(null);
    setFormData({
      nombre: '',
      tipo: 'bebida',
      precio: 0,
      descripcion: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={handleOpenDialog}
        sx={{ mb: 3 }}
      >
        Nuevo Producto
      </Button>

      <Paper elevation={3}>
        <List>
          {productos.map((producto) => (
            <ListItem 
              key={producto.id}
              secondaryAction={
                <>
                  <Button 
                    startIcon={<Edit />}
                    onClick={() => handleEdit(producto)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button 
                    startIcon={<Delete />}
                    onClick={() => handleDelete(producto.id)}
                    color="error"
                  >
                    Eliminar
                  </Button>
                </>
              }
            >
              <ListItemText
                primary={`${producto.nombre} (${producto.tipo})`}
                secondary={`$${producto.precio} - ${producto.descripcion}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Diálogo para crear/editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentProduct ? 'Editar Producto' : 'Nuevo Producto'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              name="nombre"
              label="Nombre"
              fullWidth
              value={formData.nombre}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                name="tipo"
                value={formData.tipo}
                label="Tipo"
                onChange={handleInputChange}
                required
              >
                <MenuItem value="bebida">Bebida</MenuItem>
                <MenuItem value="combo">Combo</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              name="precio"
              label="Precio"
              type="number"
              fullWidth
              value={formData.precio}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="descripcion"
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              {currentProduct ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProductosPage;
