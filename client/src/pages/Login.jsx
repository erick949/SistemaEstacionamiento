import React, { useState } from "react";
import { loginUsuario } from "../api/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUsuario(usuario, contraseña);
      setMensaje(`Bienvenido ${data.usuario}, tu rol es ${data.rol}`);
      localStorage.setItem("usuario", data.usuario);
      localStorage.setItem("rol", data.rol);
      if (data.rol === "admin") navigate("/admin");
      else if (data.rol === "empleado") navigate("/empleado");
      else if (data.rol === "cliente") navigate("/cliente");
    } catch (error) {
      setMensaje("Error: " + error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#fddb92] text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 drop-shadow-lg">
        Iniciar Sesión
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          className="w-full px-5 py-3 rounded-xl bg-white/90 text-black placeholder-gray-600 border-none shadow-inner focus:ring-4 focus:ring-yellow-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          className="w-full px-5 py-3 rounded-xl bg-white/90 text-black placeholder-gray-600 border-none shadow-inner focus:ring-4 focus:ring-yellow-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Entrar
        </button>
      </form>

      {mensaje && (
        <p className="mt-5 text-center bg-white/90 text-red-700 font-medium py-2 px-4 rounded-xl shadow-md">
          {mensaje}
        </p>
      )}

      {/* Línea divisoria */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-t border-white/40" />
        <span className="mx-4 text-white/70 text-sm">o</span>
        <hr className="flex-grow border-t border-white/40" />
      </div>

      {/* Botón de registro más sutil */}
      <div className="text-center">
        <button
          onClick={() => navigate("/registro")}
          className="text-sm text-white/80 hover:text-white underline transition duration-200"
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </div>
    </div>
  );
}
