import { useEffect, useState } from 'react';
import { crearAuto } from '../api/autos';
import { obtenerUsuarios } from '../api/usuarios'; // Importamos los usuarios

export default function AutoForm({ onAutoCreado }) {
  const [auto, setAuto] = useState({ placa: '', modelo: '', color: '', cliente: '' });
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    // Filtramos solo los que tengan rol 'cliente'
    const clientes = data.filter((u) => u.rol === 'cliente');
    setUsuarios(clientes);
  };

  const handleChange = (e) => {
    setAuto({ ...auto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoAuto = await crearAuto(auto);
    onAutoCreado(nuevoAuto);
    setAuto({ placa: '', modelo: '', color: '', cliente: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="placa" placeholder="Placa" value={auto.placa} onChange={handleChange} />
      <input name="modelo" placeholder="Modelo" value={auto.modelo} onChange={handleChange} />
      <input name="color" placeholder="Color" value={auto.color} onChange={handleChange} />

      {/* Select para elegir cliente por nombre, enviando el ID */}
      <select name="cliente" value={auto.cliente} onChange={handleChange} required>
        <option value="">Seleccionar cliente</option>
        {usuarios.map((usuario) => (
          <option key={usuario.id} value={usuario.id}>
            {usuario.usuario}
          </option>
        ))}
      </select>

      <button type="submit">Crear Auto</button>
    </form>
  );
}
