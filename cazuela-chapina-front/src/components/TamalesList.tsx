import { useState, useEffect } from 'react';
import { tamalesService } from '../services/api';
import { 
  Button, 
  List, 
  ListItem, 
  ListItemText, // Añade esta importación
  Typography 
} from '@mui/material';

type Tamal = {
  id: number;
  tipoMasa: string;
  relleno: string;
  envoltura: string;
  picante: string;
};

const TamalesList = () => {
  const [tamales, setTamales] = useState<Tamal[]>([]);

  useEffect(() => {
    loadTamales();
  }, []);

  const loadTamales = async () => {
    try {
      const response = await tamalesService.getAll();
      setTamales(response.data);
    } catch (error) {
      console.error('Error cargando tamales:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await tamalesService.delete(id);
      loadTamales(); // Recarga la lista después de eliminar
    } catch (error) {
      console.error('Error eliminando tamal:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Lista de Tamales
      </Typography>
      
      {tamales.length === 0 ? (
        <Typography variant="body1">No hay tamales registrados</Typography>
      ) : (
        <List>
          {tamales.map((tamal) => (
            <ListItem 
              key={tamal.id}
              secondaryAction={
                <Button 
                  onClick={() => handleDelete(tamal.id)} 
                  color="error"
                  variant="outlined"
                  size="small"
                >
                  Eliminar
                </Button>
              }
            >
              <ListItemText
                primary={`${tamal.tipoMasa} con ${tamal.relleno}`}
                secondary={`Envoltura: ${tamal.envoltura} - Picante: ${tamal.picante}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TamalesList;