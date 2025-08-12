import { useState } from 'react';
import { tamalesService } from '../services/api';
import TamalesList from '../components/TamalesList';
import TamalForm from '../components/TamalForm';
import { Button, Box, Typography  } from '@mui/material';

const TamalesPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateTamal = async (data: any) => {
    await tamalesService.create(data);
    setShowForm(false);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Gestión de Tamales
      </Typography>
      <Button 
        onClick={() => setShowForm(!showForm)} 
        variant="contained"
        sx={{ mb: 3 }}
      >
        {showForm ? 'Cancelar' : 'Agregar Tamal'}
      </Button>
      
      {showForm && (
        <TamalForm 
          onSubmit={handleCreateTamal} 
          onCancel={() => setShowForm(false)}
        />
      )}
      
      <TamalesList />
    </Box>
  );
};

export default TamalesPage;