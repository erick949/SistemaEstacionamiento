// src/api/reservas.js
const API_BASE_URL = `${import.meta.env.VITE_API_URL}reservas/`;

// Obtener todas las reservas
export async function obtenerReservas() {
  const res = await fetch(`${API_BASE_URL}`);
  if (!res.ok) throw new Error('Error al obtener las reservas');
  return res.json();
}

// Crear una nueva reserva
export async function crearReserva(reserva) {
  const res = await fetch(`${API_BASE_URL}crear/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reserva),
  });
  if (!res.ok) throw new Error('Error al crear la reserva');
  return res.json();
}

// Actualizar una reserva existente
export async function actualizarReserva(id, reserva) {
  const res = await fetch(`${API_BASE_URL}actualizar/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reserva),
  });
  if (!res.ok) throw new Error('Error al actualizar la reserva');
  return res.json();
}

// Eliminar una reserva
export async function eliminarReserva(id) {
  const res = await fetch(`${API_BASE_URL}eliminar/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar la reserva');
  return res.json();
}
