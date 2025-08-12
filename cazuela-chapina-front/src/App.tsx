import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProductosPage from './pages/ProductosPage';
import TamalesPage from './pages/TamalesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/tamales" element={<TamalesPage />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}

export default App;