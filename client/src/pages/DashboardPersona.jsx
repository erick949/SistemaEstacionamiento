import React, { useEffect, useState } from 'react';
import {
  crearPersona,
  obtenerPersonas,
  eliminarPersona,
  actualizarPersona,
} from '../api/persona';
import { obtenerUsuarios } from '../api/usuarios'; // 👈 Importar usuarios

function Dashboard() {
  const [formData, setFormData] = useState({
    user: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
  });

  const [usuarios, setUsuarios] = useState([]); // 👈 Lista de usuarios disponibles
  const [personas, setPersonas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [personaEditando, setPersonaEditando] = useState({
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
  });

  useEffect(() => {
    cargarPersonas();
    cargarUsuarios(); // 👈 Cargar usuarios al montar
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios', error);
    }
  };

  const cargarPersonas = async () => {
    const data = await obtenerPersonas();
    setPersonas(data);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await crearPersona(formData);
    alert(res.mensaje || JSON.stringify(res));
    setFormData({ user: '', telefono: '', direccion: '', fecha_nacimiento: '' });
    cargarPersonas();
  };

  const handleEliminar = async (id) => {
    const res = await eliminarPersona(id);
    alert(res.mensaje || JSON.stringify(res));
    cargarPersonas();
  };

  const handleEditar = (persona) => {
    setEditandoId(persona.id);
    setPersonaEditando({
      telefono: persona.telefono || '',
      direccion: persona.direccion || '',
      fecha_nacimiento: persona.fecha_nacimiento || '',
    });
  };

  const handleChangeEdicion = (e) => {
    const { name, value } = e.target;
    setPersonaEditando((prev) => ({ ...prev, [name]: value }));
  };

  const handleActualizar = async (id) => {
    const res = await actualizarPersona(id, personaEditando);
    alert(res.mensaje || JSON.stringify(res));
    setEditandoId(null);
    setPersonaEditando({ telefono: '', direccion: '', fecha_nacimiento: '' });
    cargarPersonas();
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setPersonaEditando({ telefono: '', direccion: '', fecha_nacimiento: '' });
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'Sin edad';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Personas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {/* 👇 SELECT de usuarios */}
        <select
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.usuario}
            </option>
          ))}
        </select>

        <input
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
        <input
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
        />
        <button type="submit">Crear</button>
      </form>

      <ul>
        {personas.map((p) => (
          <li key={p.id}>
            <strong>{p.username}</strong> -{' '}
            {editandoId === p.id ? (
              <>
                <input
                  name="telefono"
                  value={personaEditando.telefono}
                  onChange={handleChangeEdicion}
                  placeholder="Teléfono"
                />
                <input
                  name="direccion"
                  value={personaEditando.direccion}
                  onChange={handleChangeEdicion}
                  placeholder="Dirección"
                />
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={personaEditando.fecha_nacimiento}
                  onChange={handleChangeEdicion}
                />
                <button onClick={() => handleActualizar(p.id)}>Guardar</button>
                <button onClick={handleCancelar}>Cancelar</button>
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
                  {p.telefono || 'Sin teléfono'}
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
                  {p.direccion}
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
                  {calcularEdad(p.fecha_nacimiento)} años
                </span>

                <button onClick={() => handleEliminar(p.id)} style={{ marginLeft: '10px' }}>
                  Eliminar
                </button>
                <button onClick={() => handleEditar(p)} style={{ marginLeft: '5px' }}>
                  Modificar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
