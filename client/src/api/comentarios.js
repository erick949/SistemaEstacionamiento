// src/api/comentarios.js

// const API_URL = `${import.meta.env.VITE_API_URL}comentarios/`;

const API_URL = 'http://localhost:8000/comentarios/'

export async function registrarComentario(comentario) {
  const response = await fetch(`${API_URL}registrar/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comentario),
  });

  return await response.json();
}

export async function obtenerComentarios() {
  const response = await fetch(`${API_URL}obtener/`, {
    method: 'GET',
  });

  return await response.json();
}

export async function eliminarComentario(id) {
  const response = await fetch(`${API_URL}eliminar/${id}/`, {
    method: 'DELETE',
  });

  return await response.json();
}
