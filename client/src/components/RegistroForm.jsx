import React, { useState, useEffect } from 'react';
import { crearRegistro } from '../api/registro';
import { obtenerAutos } from '../api/autos';  // Importa la función para obtener autos

const RegistroForm = ({ onRegistroCreado }) => {
  const [autoId, setAutoId] = useState('');
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    const cargarAutos = async () => {
      const data = await obtenerAutos();
      setAutos(data);
    };
    cargarAutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!autoId) return;

    await crearRegistro(autoId);
    setAutoId('');
    onRegistroCreado(); // para refrescar la lista
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label>
        Selecciona un Auto:
        <select
          value={autoId}
          onChange={(e) => setAutoId(e.target.value)}
          className="ml-2 border p-1"
          required
        >
          <option value="">-- Elige una placa --</option>
          {autos.map((auto) => (
            <option key={auto.id} value={auto.id}>
              {auto.placa} - {auto.modelo}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn btn-green ml-2">Registrar Entrada</button>
    </form>
  );
};

export default RegistroForm;
