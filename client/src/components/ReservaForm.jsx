import { useState, useEffect } from 'react';

export default function ReservaForm({ reserva, onChange, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id_auto: '',
    fecha_reserva: '',
    hora_reserva: '',
    duracion: '',
  });

  useEffect(() => {
    if (reserva) {
      setForm(reserva);
    } else {
      setForm({
        id_auto: '',
        fecha_reserva: '',
        hora_reserva: '',
        duracion: '',
      });
    }
  }, [reserva]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (onChange) onChange({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convierte a número los campos numéricos antes de enviar
    const dataToSubmit = {
      ...form,
      id_auto: parseInt(form.id_auto),
      duracion: parseInt(form.duracion),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4">
      <input
        type="number"
        name="id_auto"
        value={form.id_auto}
        onChange={handleChange}
        placeholder="ID del Auto"
        className="input"
        required
      />
      <input
        type="date"
        name="fecha_reserva"
        value={form.fecha_reserva}
        onChange={handleChange}
        className="input"
        required
      />
      <input
        type="time"
        name="hora_reserva"
        value={form.hora_reserva}
        onChange={handleChange}
        className="input"
        required
      />
      <input
        type="number"
        name="duracion"
        value={form.duracion}
        onChange={handleChange}
        placeholder="Duración (horas)"
        className="input"
        required
      />
      <button type="submit" className="btn bg-blue-500 text-white mr-2">
        Guardar
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} className="btn bg-gray-500 text-white">
          Cancelar
        </button>
      )}
    </form>
  );
}
