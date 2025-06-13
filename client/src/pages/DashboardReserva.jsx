import { useState, useEffect } from 'react';
import { obtenerAutos } from '../api/autos';
import {
  obtenerReservas,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} from '../api/reservas';

export default function Dashboard() {
  const [reservas, setReservas] = useState([]);
  const [autos, setAutos] = useState([]);
  const [nuevaReserva, setNuevaReserva] = useState({
    id_auto: '',
    fecha_reserva: '',
    hora_reserva: '',
    duracion: '',
  });
  const [editandoId, setEditandoId] = useState(null);
  const [reservaEditando, setReservaEditando] = useState({
    id_auto: '',
    fecha_reserva: '',
    hora_reserva: '',
    duracion: '',
  });

  useEffect(() => {
    cargarReservas();
    cargarAutos();
  }, []);

  const cargarReservas = async () => {
    const data = await obtenerReservas();
    setReservas(data);
  };

  const cargarAutos = async () => {
    const data = await obtenerAutos();
    setAutos(data);
  };

  const handleChangeNueva = (e) => {
    const { name, value } = e.target;
    setNuevaReserva(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitNueva = async (e) => {
    e.preventDefault();
    const data = {
      ...nuevaReserva,
      id_auto: parseInt(nuevaReserva.id_auto),
      duracion: parseInt(nuevaReserva.duracion),
    };
    await crearReserva(data);
    setNuevaReserva({ id_auto: '', fecha_reserva: '', hora_reserva: '', duracion: '' });
    cargarReservas();
  };

  const handleEliminar = async (id) => {
    await eliminarReserva(id);
    cargarReservas();
  };

  const handleEditar = (reserva) => {
    setEditandoId(reserva.id);
    setReservaEditando({
      id_auto: reserva.id_auto,
      fecha_reserva: reserva.fecha_reserva,
      hora_reserva: reserva.hora_reserva,
      duracion: reserva.duracion,
    });
  };

  const handleChangeEdicion = (e) => {
    const { name, value } = e.target;
    setReservaEditando(prev => ({ ...prev, [name]: value }));
  };

  const handleActualizar = async (id) => {
    const data = {
      ...reservaEditando,
      id_auto: parseInt(reservaEditando.id_auto),
      duracion: parseInt(reservaEditando.duracion),
    };
    await actualizarReserva(id, data);
    setEditandoId(null);
    setReservaEditando({ id_auto: '', fecha_reserva: '', hora_reserva: '', duracion: '' });
    cargarReservas();
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setReservaEditando({ id_auto: '', fecha_reserva: '', hora_reserva: '', duracion: '' });
  };

  const formatearHoras = (num) => `${num} hora${num === 1 ? '' : 's'}`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>Reservas</h1>

      <form onSubmit={handleSubmitNueva} className="mb-4 space-x-2">
        <select
          name="id_auto"
          value={nuevaReserva.id_auto}
          onChange={handleChangeNueva}
          required
        >
          <option value="">Selecciona un auto</option>
          {autos.map(auto => (
            <option key={auto.id} value={auto.id}>{auto.placa}</option>
          ))}
        </select>
        <input
          name="fecha_reserva"
          type="date"
          value={nuevaReserva.fecha_reserva}
          onChange={handleChangeNueva}
          required
        />
        <input
          name="hora_reserva"
          type="time"
          value={nuevaReserva.hora_reserva}
          onChange={handleChangeNueva}
          required
        />
        <input
          name="duracion"
          type="number"
          placeholder="Duración"
          value={nuevaReserva.duracion}
          onChange={handleChangeNueva}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-2 rounded">Crear</button>
      </form>

      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id} className="mb-2">
            {editandoId === reserva.id ? (
              <>
                <select
                  name="id_auto"
                  value={reservaEditando.id_auto}
                  onChange={handleChangeEdicion}
                >
                  <option value="">Selecciona un auto</option>
                  {autos.map(auto => (
                    <option key={auto.id} value={auto.id}>{auto.placa}</option>
                  ))}
                </select>
                <input
                  name="fecha_reserva"
                  type="date"
                  value={reservaEditando.fecha_reserva}
                  onChange={handleChangeEdicion}
                />
                <input
                  name="hora_reserva"
                  type="time"
                  value={reservaEditando.hora_reserva}
                  onChange={handleChangeEdicion}
                />
                <input
                  name="duracion"
                  type="number"
                  value={reservaEditando.duracion}
                  onChange={handleChangeEdicion}
                />
                <button onClick={() => handleActualizar(reserva.id)} className="ml-2">Guardar</button>
                <button onClick={handleCancelar} className="ml-2">Cancelar</button>
              </>
            ) : (
              <>
                {(() => {
                  const auto = autos.find(a => a.id === reserva.id_auto);
                  const placa = auto ? auto.placa : `ID ${reserva.id_auto}`;
                  return (
                    <>
                      {placa} - {reserva.fecha_reserva} {reserva.hora_reserva} - {formatearHoras(reserva.duracion)}
                    </>
                  );
                })()}
                <button onClick={() => handleEditar(reserva)} className="ml-2">Modificar</button>
                <button onClick={() => handleEliminar(reserva.id)} className="ml-2">Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
