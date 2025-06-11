import React, { useEffect, useState } from 'react';
import { obtenerPersonas, eliminarPersona, actualizarPersona } from '../api/persona';

function ListaPersonas() {
  const [personas, setPersonas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    user: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
  });

  useEffect(() => {
    cargarPersonas();
  }, []);

  const cargarPersonas = async () => {
    const data = await obtenerPersonas();
    setPersonas(data);
  };

  const handleEliminar = async (id) => {
    await eliminarPersona(id);
    cargarPersonas();
  };

  const handleEditarClick = (persona) => {
    setEditandoId(persona.id);
    setFormData({
      user: persona.user_id?.toString() || '',
      telefono: persona.telefono || '',
      direccion: persona.direccion || '',
      fecha_nacimiento: persona.fecha_nacimiento || '',
    });
  };

  const handleGuardarClick = async (id) => {
    await actualizarPersona(id, formData);
    setEditandoId(null);
    setFormData({ user: '', telefono: '', direccion: '', fecha_nacimiento: '' });
    cargarPersonas();
  };

  const handleCancelarClick = () => {
    setEditandoId(null);
    setFormData({ user: '', telefono: '', direccion: '', fecha_nacimiento: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ul>
      {personas.map((p) => (
        <li key={p.id} style={{ marginBottom: '10px' }}>
          {editandoId === p.id ? (
            <>
              <input
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="ID Usuario"
                style={{ width: '60px', marginRight: '5px' }}
              />
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                style={{ marginRight: '5px' }}
              />
              <input
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Dirección"
                style={{ marginRight: '5px' }}
              />
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                style={{ marginRight: '5px' }}
              />
              <button onClick={() => handleGuardarClick(p.id)} style={{ marginRight: '5px' }}>
                Guardar
              </button>
              <button onClick={handleCancelarClick}>Cancelar</button>
            </>
          ) : (
            <>
              {p.username} - {p.telefono} - {p.direccion} - {p.fecha_nacimiento}
              <button onClick={() => handleEditarClick(p)} style={{ marginLeft: '10px', marginRight: '5px' }}>
                Modificar
              </button>
              <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ListaPersonas;
