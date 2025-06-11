import React, { useEffect, useState } from 'react';
import { obtenerRegistros, registrarSalida, eliminarRegistro } from '../api/registro';

const RegistroList = () => {
  const [registros, setRegistros] = useState([]);

  const cargarRegistros = async () => {
    const data = await obtenerRegistros();
    setRegistros(data);
  };

  const handleSalida = async (id) => {
    await registrarSalida(id);
    cargarRegistros();
  };

  const handleEliminar = async (id) => {
    await eliminarRegistro(id);
    cargarRegistros();
  };

  useEffect(() => {
    cargarRegistros();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Registros</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((reg) => (
            <tr key={reg.id}>
              <td>{reg.id}</td>
              <td>{reg.placa}</td>
              <td>{reg.fechaEntrada}</td>
              <td>{reg.fechaSalida || '---'}</td>
              <td>{reg.costoTotal !== null ? `$${reg.costoTotal}` : '---'}</td>
              <td>
                {!reg.fechaSalida && (
                  <button onClick={() => handleSalida(reg.id)} className="btn btn-blue">Registrar salida</button>
                )}
                <button onClick={() => handleEliminar(reg.id)} className="btn btn-red ml-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroList;
