export default function ReservaList({ reservas, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th>ID Auto</th>
            <th>Fecha Reserva</th>
            <th>Hora Reserva</th>
            <th>Duración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td>{r.id_auto}</td>
              <td>{r.fecha_reserva}</td>
              <td>{r.hora_reserva}</td>
              <td>{r.duracion}</td>
              <td>
                <button onClick={() => onEdit(r)} className="text-blue-500 mr-2">Editar</button>
                <button onClick={() => onDelete(r.id)} className="text-red-500">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
