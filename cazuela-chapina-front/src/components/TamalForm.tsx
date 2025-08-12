import { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

type TamalFormProps = {
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

const TamalForm = ({ onSubmit, onCancel }: TamalFormProps) => {
  const [formData, setFormData] = useState({
    tipoMasa: 'maíz amarillo',
    relleno: 'recado rojo de cerdo',
    picante: 'sin chile',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Masa</InputLabel>
        <Select
          value={formData.tipoMasa}
          onChange={(e) => setFormData({ ...formData, tipoMasa: e.target.value })}
          label="Masa"
        >
          <MenuItem value="maíz amarillo">Maíz Amarillo</MenuItem>
          <MenuItem value="maíz blanco">Maíz Blanco</MenuItem>
          <MenuItem value="arroz">Arroz</MenuItem>
        </Select>
      </FormControl>

 
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </Box>
    </form>
  );
};

export default TamalForm;
