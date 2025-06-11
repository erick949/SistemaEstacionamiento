import React, { useState } from "react";
import { crearUsuario } from "../api/usuarios";

export default function UserFormCliente({ onSuccess }) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioData = {
      usuario,
      contraseña,
      rol: "cliente", // rol fijado desde el frontend
    };

    try {
      await crearUsuario(usuarioData);
      setMensaje("¡Registro exitoso!");
      setUsuario("");
      setContraseña("");
      onSuccess?.(); // si se pasa un callback
    } catch (error) {
      console.error(error);
      setMensaje("Hubo un error al registrarse.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-[#2c3e50] via-[#4ca1af] to-[#f9d423] text-white"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6 drop-shadow-lg">
        Registrarse como Cliente
      </h2>

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
        className="w-full px-5 py-3 mb-4 rounded-xl bg-white/90 text-black placeholder-gray-600 border-none shadow-inner focus:ring-4 focus:ring-yellow-400 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
        className="w-full px-5 py-3 mb-4 rounded-xl bg-white/90 text-black placeholder-gray-600 border-none shadow-inner focus:ring-4 focus:ring-yellow-400 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full py-3 bg-green-400 hover:bg-green-500 text-black font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Registrarse
      </button>

      {mensaje && (
        <p className={`mt-5 text-center py-2 px-4 rounded-xl shadow-md ${mensaje.includes('exitoso') ? 'bg-white/90 text-green-700' : 'bg-white/90 text-red-700'}`}>
          {mensaje}
        </p>
      )}
    </form>
  );
}
