import React, { useEffect, useState } from "react";

import {
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  crearUsuario,
} from "../api/usuarios";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function DashboardUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: "",
    contraseña: "",
    rol: "cliente",
  });
  const [editData, setEditData] = useState({
    usuario: "",
    contraseña: "",
    rol: "cliente",
  });
  const [mensaje, setMensaje] = useState("");

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 3000);
  };

  const fetchUsuarios = async () => {
    try {
      setCargando(true);
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError("Error al cargar usuarios");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        usuario: nuevoUsuario.usuario,
        rol: nuevoUsuario.rol,
        ...(nuevoUsuario.contraseña && { contraseña: nuevoUsuario.contraseña }),
      };
      await crearUsuario(dataToSend);
      setNuevoUsuario({ usuario: "", contraseña: "", rol: "cliente" });
      fetchUsuarios();
      mostrarMensaje("✅ Usuario creado correctamente");
    } catch {
      alert("Error creando usuario");
    }
  };

  const iniciarEdicion = (usuario) => {
  
    //asta aqui si llega el usuario pero si uso setEditado me causa el error
    setEditandoId(usuario.id);
    setEditData({
      usuario: usuario.usuario,
      contraseña: "",
      rol: usuario.rol || "cliente",
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setEditData({ usuario: "", contraseña: "", rol: "cliente" });
  };

  const guardarEdicion = async (id) => {
    try {
      const dataToSend = {
        usuario: editData.usuario,
        rol: editData.rol,
        ...(editData.contraseña && { contraseña: editData.contraseña }),
      };
      await actualizarUsuario(id, dataToSend);
      // console.log("Datos a enviar:", dataToSend);
      setEditandoId(null);
      setEditData({ usuario: "", contraseña: "", rol: "cliente" });
      fetchUsuarios();
      mostrarMensaje("✏️ Usuario actualizado correctamente");
    } catch {
      alert("Error actualizando usuario");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      await eliminarUsuario(id);
      fetchUsuarios();
      mostrarMensaje("🗑️ Usuario eliminado correctamente");
    }
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{   width: '100%', maxWidth: '100%' }}>

      <h1 style={{ textAlign: 'center' }}>Usuarios</h1>

      {mensaje && (
        <div style={{ marginBottom: "1rem", color: "green", fontWeight: "bold" }}>
          {mensaje}
        </div>
      )}

      <UserForm
        nuevoUsuario={nuevoUsuario}
        setNuevoUsuario={setNuevoUsuario}
        handleCrear={handleCrear}
      />

      <UserList
        usuarios={usuarios}
        editandoId={editandoId}
        editData={editData}
        setEditData={setEditData}
        iniciarEdicion={iniciarEdicion}
        cancelarEdicion={cancelarEdicion}
        guardarEdicion={guardarEdicion}
        handleEliminar={handleEliminar}
      />
    </div>
  );
}
