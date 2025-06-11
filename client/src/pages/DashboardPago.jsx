// src/pages/DashboardPago.jsx
import PagoForm from '../components/PagoForm';
import PagoList from '../components/PagoList';
import { useState } from 'react';

function DashboardPago() {
  const [reload, setReload] = useState(false);

  const recargarPagos = () => {
    setReload((prev) => !prev);
  };

  return (
    <div className="p-4">
      <h1>Pagos</h1>
      <PagoForm onPagoRegistrado={recargarPagos} />
      <hr />
      <PagoList key={reload} />
    </div>
  );
}

export default DashboardPago;
