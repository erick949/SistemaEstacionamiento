import React, { useState } from 'react';

export default function RegistrarComentario({ onNuevoComentario, loading }) {
  const [calificacion, setCalificacion] = useState(5);
  const [comentarioTexto, setComentarioTexto] = useState('');
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!comentarioTexto.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }

    const nuevoComentario = {
      cliente: 1, // Reemplaza con el ID del usuario logueado si es necesario
      calificacion,
      comentario: comentarioTexto,
    };

    onNuevoComentario(nuevoComentario, () => {
      setComentarioTexto('');
      setCalificacion(5);
    }).catch(() => setError('Error al registrar comentario'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Calificación:
        <div style={{ display: 'flex', gap: '4px', margin: '8px 0' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setCalificacion(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                cursor: 'pointer',
                fontSize: '1.8em',
                color:
                  (hover || calificacion) >= star ? '#f5c518' : '#ccc',
                transition: 'color 0.2s ease',
              }}
            >
              ★
            </span>
          ))}
        </div>
      </label>

      <label>
        Comentario:
        <textarea
          value={comentarioTexto}
          onChange={(e) => setComentarioTexto(e.target.value)}
          rows={4}
          style={{ width: '100%' }}
        />
      </label>

      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Procesando...' : 'Enviar Comentario'}
      </button>
    </form>
  );
}
