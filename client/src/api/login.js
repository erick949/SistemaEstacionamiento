const API_URL = import.meta.env.VITE_API_URL;

export async function loginUsuario(usuario, contraseña) {


  const response = await fetch(`${API_URL}usuarios/login/`, {

    


    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, contraseña }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "No autorizado");
  }

  return await response.json(); // contiene usuario y rol
}
