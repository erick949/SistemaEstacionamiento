import { useEffect, useState } from 'react';
import { obtenerAutos, eliminarAuto, actualizarAuto } from '../api/autos';

export default function AutoList() {
  const [autos, setAutos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    color: ''
  });

  const cargarAutos = async () => {
    const data = await obtenerAutos();
    setAutos(data);
  };

  useEffect(() => {
    cargarAutos();
  }, []);

  const handleEliminar = async (id) => {
    await eliminarAuto(id);
    cargarAutos();
  };

  const iniciarEdicion = (auto) => {
    setEditandoId(auto.id);
    setFormData({
      placa: auto.placa,
      modelo: auto.modelo,
      color: auto.color
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData({ placa: '', modelo: '', color: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const guardarCambios = async () => {
    await actualizarAuto(editandoId, formData);
    cancelarEdicion();
    cargarAutos();
  };

  return (
    <ul>
      {autos.map((auto) => (
        <li key={auto.id}>
          {editandoId === auto.id ? (
            <>
              <input
                name="placa"
                value={formData.placa}
                onChange={handleChange}
              />
              <input
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
              />
              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
              <button onClick={guardarCambios}>Guardar</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </>
          ) : (
            <>
              {auto.placa} - {auto.modelo} - {auto.color} - Cliente: {auto.cliente_usuario}
              <button onClick={() => iniciarEdicion(auto)}>Modificar</button>
              <button onClick={() => handleEliminar(auto.id)}>Eliminar</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
