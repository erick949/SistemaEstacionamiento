import React from "react";

export default function UserList({
  usuarios,
  editandoId,
  editData,
  setEditData,
  iniciarEdicion,
  cancelarEdicion,
  guardarEdicion,
  handleEliminar,
}) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {usuarios.map((usuario) => (
        <li
          key={usuario.id}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            border: "1px solid #ccc",
          }}
        >
          {editandoId === usuario.id ? (
            <>
              <input
                type="text"
                value={editData.usuario}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, usuario: e.target.value }))
                }
                required
                style={{ marginRight: 8 }}
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={editData.contraseña}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, contraseña: e.target.value }))
                }
                style={{ marginRight: 8 }}
              />
              <select
                value={editData.rol}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, rol: e.target.value }))
                }
                required
                style={{ marginRight: 8 }}
              >
                <option value="admin">Admin</option>
                <option value="empleado">Empleado</option>
                <option value="cliente">Cliente</option>
              </select>
              <button
                onClick={() => guardarEdicion(usuario.id)}
                style={{ marginRight: 8 }}
              >
                Guardar
              </button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </>
          ) : (
            <>
              <span>{usuario.usuario}</span> - <em>{usuario.rol}</em>
              <button
                onClick={() => iniciarEdicion(usuario)}
                style={{ marginLeft: 8, marginRight: 8 }}
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminar(usuario.id)}
                style={{ color: "red" }}
              >
                Eliminar
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
