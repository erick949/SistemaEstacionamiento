import React from "react";

export default function UserForm({ nuevoUsuario, setNuevoUsuario, handleCrear }) {
  return (
    <form
      onSubmit={handleCrear}
      style={{
        marginBottom: "2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        width: "100%",
      }}
    >
      <input
        type="text"
        placeholder="Usuario"
        value={nuevoUsuario.usuario}
        onChange={(e) =>
          setNuevoUsuario((prev) => ({ ...prev, usuario: e.target.value }))
        }
        required
        style={{ flex: "1 1 200px", minWidth: 0 }}
        autoComplete="username" // mejora UX en navegadores
        spellCheck={false} // evita autocorrección en nombres de usuario
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={nuevoUsuario.contraseña}
        onChange={(e) =>
          setNuevoUsuario((prev) => ({ ...prev, contraseña: e.target.value }))
        }
        required
        style={{ flex: "1 1 200px", minWidth: 0 }}
        autoComplete="new-password" // evita autofill incorrecto
      />
      <select
        value={nuevoUsuario.rol}
        onChange={(e) =>
          setNuevoUsuario((prev) => ({ ...prev, rol: e.target.value }))
        }
        required
        style={{ flex: "1 1 150px", minWidth: 0 }}
      >
        <option value="admin">Admin</option>
        <option value="empleado">Empleado</option>
        <option value="cliente">Cliente</option>
      </select>
      <button type="submit" style={{ flex: "1 1 100px", minWidth: 0 }}>
        Crear
      </button>
    </form>
  );
}
