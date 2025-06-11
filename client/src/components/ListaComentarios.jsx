import React from 'react';

function renderEstrellas(calificacion) {
  const maxEstrellas = 5;
  return (
    <span style={{ color: '#f5c518', fontSize: '1.2em' }}>
      {'★'.repeat(calificacion)}
      {'☆'.repeat(maxEstrellas - calificacion)}
    </span>
  );
}

export default function ListaComentarios({ comentarios, onEliminar, loading }) {
  if (loading) return <p>Cargando...</p>;

  if (!Array.isArray(comentarios) || comentarios.length === 0)
    return <p>No hay comentarios aún.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {comentarios.map(({ id, cliente, calificacion, comentario }) => (
        <li
          key={id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px',
            background: '#f9f9f9',
          }}
        >
          <p><strong>Usuario:</strong> {cliente}</p>
          <p>
            <strong>Calificación:</strong> {calificacion} / 5 <br />
            {renderEstrellas(calificacion)}
          </p>
          <p><strong>Comentario:</strong> {comentario}</p>
          <button onClick={() => onEliminar(id)} disabled={loading}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
