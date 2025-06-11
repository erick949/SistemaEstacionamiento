import React, { useState, useEffect } from 'react';
import { registrarComentario, obtenerComentarios, eliminarComentario } from '../api/comentarios';
import RegistrarComentario from '../components/RegistrarComentario';
import ListaComentarios from '../components/ListaComentarios';

export default function DashboardComentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarComentarios();
  }, []);

  const cargarComentarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerComentarios();
      setComentarios(Array.isArray(data) ? data : []);
    } catch {
      setError('Error cargando comentarios');
    }
    setLoading(false);
  };

  const handleNuevoComentario = async (nuevoComentario, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarComentario(nuevoComentario);
      if (res.id) {
        await cargarComentarios();
        onSuccess();
      } else {
        setError(res.error || 'Error desconocido al registrar');
      }
    } catch {
      setError('Error al registrar comentario');
    }
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarComentario(id);
      await cargarComentarios();
    } catch {
      setError('Error al eliminar comentario');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Comentarios de Clientes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RegistrarComentario onNuevoComentario={handleNuevoComentario} loading={loading} />
      <h3>Lista de Comentarios</h3>
      <ListaComentarios comentarios={comentarios} onEliminar={handleEliminar} loading={loading} />
    </div>
  );
}
