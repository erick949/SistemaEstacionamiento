const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerUsuarios() {
  const res = await fetch(`${API_URL}usuarios/`);  // <- Aquí agregas usuarios/
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}

export async function crearUsuario(usuarioData) {
  const res = await fetch(`${API_URL}usuarios/crear/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioData),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return await res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${API_URL}usuarios/eliminar/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
}

export async function actualizarUsuario(id, usuarioData) {
  const res = await fetch(`${API_URL}usuarios/${id}/`, {
    method: "PUT", // o PATCH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioData),
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return await res.json();
}
