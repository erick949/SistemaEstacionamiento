
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardCliente from "./pages/DashboardCliente";
import DashboardEmpleado from "./pages/DashboardEmpleado";
import DashboardAuto  from "./pages/DashboardAuto"; 
import DashboardReserva from "./pages/DashboardReserva"; // Asegúrate de importar el componente correcto
import DashboardPersona from "./pages/DashboardPersona"; // Asegúrate de importar el componente correcto
import DashboardUsuario from "./pages/DashboardUsuario";
import DashboardRegistro from "./pages/DashboardRegistro";
import DashboardPago from './pages/DashboardPago';
import DashboardReporte from "./pages/DashboardReporte";
import DashboardGraficas from "./pages/DashboardGraficas";
import Home from "./pages/Home";
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/cliente" element={<DashboardCliente />} />
        <Route path="/empleado" element={<DashboardEmpleado />} />
        <Route path="/autos" element={<DashboardAuto />} />
        <Route path="/reservas" element={<DashboardReserva />} />
        <Route path="/persona" element={<DashboardPersona />} />
        <Route path="/usuarios" element={<DashboardUsuario />} />
        <Route path="/registros" element={<DashboardRegistro />} /> 
        <Route path="pagos" element={<DashboardPago />} />
        <Route path="/reporte" element={<DashboardReporte />} />
        <Route path="/graficas" element={<DashboardGraficas />} />

        {/* Redirigir a la página de login si no se encuentra la ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
