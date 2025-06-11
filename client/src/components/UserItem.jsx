// const UserItem = ({ user, onDelete, onEdit }) => {
//   const handleDelete = async () => {
//     if (!window.confirm("¿Eliminar este usuario?")) return;
//     await fetch(`http://127.0.0.1:8000/usuarios/eliminar/${user.id}/`, {
//       method: "DELETE",
//     });
//     onDelete();
//   };

//   return (
//     <li>
//       {user.usuario} ({user.rol})
//       <button onClick={() => onEdit(user)}>Editar</button>
//       <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
//         Eliminar
//       </button>
//     </li>
//   );
// };

// export default UserItem;
