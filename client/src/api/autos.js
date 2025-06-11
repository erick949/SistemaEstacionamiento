const API_BASE_URL = `${import.meta.env.VITE_API_URL}autos/`;


export async function obtenerAutos() {
  const res = await fetch(`${API_BASE_URL}`);
  return res.json();
}

export async function crearAuto(auto) {
  const res = await fetch(`${API_BASE_URL}crear/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auto),
  });
  return res.json();
}

export async function actualizarAuto(id, auto) {
  const res = await fetch(`${API_BASE_URL}actualizar/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auto),
  });
  return res.json();
}

export async function eliminarAuto(id) {
  const res = await fetch(`${API_BASE_URL}eliminar/${id}/`, {
    method: 'DELETE',
  });
  return res.json();
}
