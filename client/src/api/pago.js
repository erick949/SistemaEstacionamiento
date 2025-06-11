// src/api/pago.js
// const API_URL = 'http://localhost:8000'; // Cambia si es necesario
const API_URL = import.meta.env.VITE_API_URL;
export async function registrarPago(pago) {
  const response = await fetch(`${API_URL}pago/registrar/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pago),
  });

  return await response.json();
}

export async function obtenerPagos() {
  const response = await fetch(`${API_URL}pago/listar/`, {
    method: 'GET',
  });

  return await response.json();
}

export async function eliminarPago(id) {
  const response = await fetch(`${API_URL}pago/eliminar/${id}/`, {
    method: 'DELETE',
  });

  return await response.json();
}
