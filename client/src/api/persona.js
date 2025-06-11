// const API_URL = 'http://localhost:8000/persona/'; // ajusta la URL si es necesario
const API_BASE_URL = `${import.meta.env.VITE_API_URL}persona/`;

const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error desconocido');
  }
};

export const crearPersona = async (personaData) => {
  const response = await fetch(`${API_URL}crear/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personaData),
  });
  return handleResponse(response);
};

export const obtenerPersonas = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response);
};

export const actualizarPersona = async (id, personaData) => {
  const response = await fetch(`${API_URL}${id}/actualizar/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personaData),
  });
  return handleResponse(response);
};

export const eliminarPersona = async (id) => {
  const response = await fetch(`${API_URL}${id}/eliminar/`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
