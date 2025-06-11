// const BASE_URL = 'http://localhost:8000/';
const BASE_URL = `${import.meta.env.VITE_API_URL}registro/`;

export const obtenerRegistros = async () => {
  const res = await fetch(`${BASE_URL}`);
  return res.json();
};

export const crearRegistro = async (auto_id) => {
  const res = await fetch(`${BASE_URL}crear/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auto: auto_id }),
  });
  return res.json();
};

export const registrarSalida = async (registro_id) => {
  const res = await fetch(`${BASE_URL}${registro_id}/salida/`, {
    method: 'PUT',
  });
  return res.json();
};

export const eliminarRegistro = async (registro_id) => {
  const res = await fetch(`${BASE_URL}${registro_id}/eliminar/`, {
    method: 'DELETE',
  });
  return res.json();
};
