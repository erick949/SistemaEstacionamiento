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
              style={{ border: '2px solid blue', borderRadius: '4px', marginBottom: '5px' }}
            />
            <input
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              style={{ border: '2px solid blue', borderRadius: '4px', marginBottom: '5px' }}
            />
            <input
              name="color"
              value={formData.color}
              onChange={handleChange}
              style={{ border: '2px solid blue', borderRadius: '4px', marginBottom: '5px' }}
            />
            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={cancelarEdicion}>Cancelar</button>
          </>
        ) : (
        <>
            <span style={{ 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc', 
                borderRadius: '6px', 
                padding: '6px 10px', 
                marginRight: '6px', 
                boxShadow: '0 0 4px rgba(0, 123, 255, 0.4)', 
                display: 'inline-block' 
              }}>
                {auto.placa}
              </span>
              <span style={{ 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc', 
                borderRadius: '6px', 
                padding: '6px 10px', 
                marginRight: '6px', 
                boxShadow: '0 0 4px rgba(0, 123, 255, 0.4)', 
                display: 'inline-block' 
              }}>
                {auto.modelo}
              </span>
              <span style={{ 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc', 
                borderRadius: '6px', 
                padding: '6px 10px', 
                marginRight: '6px', 
                boxShadow: '0 0 4px rgba(0, 123, 255, 0.4)', 
                display: 'inline-block' 
              }}>
                {auto.color}
              </span>
              <span style={{ 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc', 
                borderRadius: '6px', 
                padding: '6px 10px', 
                marginRight: '6px', 
                boxShadow: '0 0 4px rgba(0, 123, 255, 0.4)', 
                display: 'inline-block' 
              }}>
                Cliente: {auto.cliente_usuario}
              </span>


            <button onClick={() => iniciarEdicion(auto)}>Modificar</button>
            <button onClick={() => handleEliminar(auto.id)}>Eliminar</button>


          </>
        )}

        </li>
      ))}
    </ul>
  );
}
