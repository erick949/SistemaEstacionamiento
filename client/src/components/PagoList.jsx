// src/components/PagoList.jsx
import { useEffect, useState } from 'react';
import { obtenerPagos, eliminarPago } from '../api/pago';

function PagoList() {
  const [pagos, setPagos] = useState([]);

  const cargarPagos = async () => {
    const data = await obtenerPagos();
    setPagos(data);
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este pago?')) {
      await eliminarPago(id);
      cargarPagos();
    }
  };

  // Función para formatear la fecha a zona horaria México CDMX y formato legible
  const formatearFechaLocal = (fechaUTC) => {
    if (!fechaUTC) return '';
    const fecha = new Date(fechaUTC);
    return fecha.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  return (
    <div>
      <h2>Lista de Pagos</h2>
      <ul>
        {pagos.map((pago) => (
          <li key={pago.id}>
            Cliente: {pago.cliente} | Registro: {pago.registro_id} | Monto: {pago.monto} | Método: {pago.metodoPago} | Fecha: {formatearFechaLocal(pago.fechaPago)}
            <button onClick={() => handleEliminar(pago.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PagoList;
