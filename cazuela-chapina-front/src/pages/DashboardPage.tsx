import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress,
  useTheme,
  styled
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie,
  Cell,
  PieLabelRenderProps,
    ResponsiveContainer  
} from 'recharts';
import { useApi } from '../services/api';

import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

  
// Tipos para los datos del dashboard
type DashboardData = {
  ventasDiarias: number;
  ventasMensuales: number;
  productosPopulares: {
    id: number;
    nombre: string;
    cantidadVendida: number;
    tipo: string;
  }[];
  ventasPorHora: {
    hora: string;
    ventas: number;
  }[];
  proporcionPicante: {
    nombre: string;
    valor: number;
  }[];
};

// Componente contenedor personalizado con Flexbox
const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}));

// Componente ítem personalizado
const DashboardItem = styled(Box)(({ theme }) => ({
  flex: '1 1 100%',
  [theme.breakpoints.up('sm')]: {
    flex: '1 1 calc(50% - 16px)'
  },
  [theme.breakpoints.up('md')]: {
    flex: '1 1 calc(33.333% - 16px)'
  },
  [theme.breakpoints.up('lg')]: {
    flex: '1 1 calc(25% - 16px)'
  }
}));

// Función para renderizar labels corregida
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const numericCx = Number(cx) || 0;
  const numericCy = Number(cy) || 0;
  const numericInnerRadius = Number(innerRadius) || 0;
  const numericOuterRadius = Number(outerRadius) || 0;
  const numericMidAngle = Number(midAngle) || 0;
  const radius = numericInnerRadius + (numericOuterRadius - numericInnerRadius) * 0.5;
  const x = numericCx + radius * Math.cos(-numericMidAngle * RADIAN);
  const y = numericCy + radius * Math.sin(-numericMidAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
    </text>
  );
};

const DashboardPage = () => {
    
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, loading, error } = useApi<DashboardData>('/Dashboard');

  // Datos demo para fallback
  const demoData: DashboardData = {
    ventasDiarias: 3425.50,
    ventasMensuales: 98750.75,
    productosPopulares: [
      { id: 1, nombre: 'Tamal Chapín', cantidadVendida: 125, tipo: 'tamal' },
      { id: 2, nombre: 'Atol de Elote', cantidadVendida: 98, tipo: 'bebida' },
      { id: 3, nombre: 'Combo Familiar', cantidadVendida: 45, tipo: 'combo' }
    ],
    ventasPorHora: [
      { hora: '08:00', ventas: 15 },
      { hora: '10:00', ventas: 42 },
      { hora: '12:00', ventas: 78 },
      { hora: '14:00', ventas: 35 },
      { hora: '16:00', ventas: 64 },
      { hora: '18:00', ventas: 92 }
    ],
    proporcionPicante: [
      { nombre: 'Sin Chile', valor: 35 },
      { nombre: 'Suave', valor: 45 },
      { nombre: 'Chapín', valor: 20 }
    ]
  };
 
  const chartData = data || demoData;
 
  const productosPopulares = chartData.productosPopulares ?? [];
  const ventasPorHora = chartData.ventasPorHora ?? [];
  const proporcionPicante = chartData.proporcionPicante ?? [];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main
  ];

  if (loading) return <CircularProgress sx={{ margin: 'auto' }} />;
  if (error) return <Typography color="error">Error: {error}</Typography>;



  return (
   
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Control
      </Typography>
   
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
 
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/tamales")}
            >
              Ir a Tamales
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/productos")}
            >
              Ir a Productos
            </Button>
        </Stack>
      <DashboardContainer>
     
        <DashboardItem>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Ventas</Typography>
            <Typography>Diarias: Q{chartData.ventasDiarias.toFixed(2)}</Typography>
            <Typography>Mensuales: Q{chartData.ventasMensuales.toFixed(2)}</Typography>
          </Paper>
        </DashboardItem>

        {/* Gráfico de ventas por hora */}
        <DashboardItem sx={{ flexBasis: '100%' }}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Ventas por Hora</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={ventasPorHora}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip formatter={(value) => [`Q${value}`, 'Ventas']} />
                <Bar dataKey="ventas" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </DashboardItem>

        {/* Gráfico de productos populares */}
        <DashboardItem>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Productos Populares</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={productosPopulares}
                  dataKey="cantidadVendida"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={renderCustomizedLabel}
                >
                  {productosPopulares.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} unidades`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </DashboardItem>

        {/* Gráfico de proporción de picante */}
        <DashboardItem>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Niveles de Picante</Typography>
            <ResponsiveContainer width="100%" height="200%">
              <PieChart>
                <Pie
                  data={proporcionPicante}
                  dataKey="valor"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={renderCustomizedLabel}
                >
                  {proporcionPicante.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Proporción']} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </DashboardItem>
      </DashboardContainer>
    </Box>
  );
  
};



export default DashboardPage;
