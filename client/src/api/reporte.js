// src/api/reporte.js
// const API_URL = 'http://localhost:8000'; // Cambia si es necesario

const API_URL = import.meta.env.VITE_API_URL;
export async function generarReporte(datosReporte) {
  const response = await fetch(`${API_URL}/reporte/generar/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosReporte),
  });

  return await response.json();
}
