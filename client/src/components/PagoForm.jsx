// src/components/PagoForm.jsx
import { useState } from 'react';
import { registrarPago } from '../api/pago';

function PagoForm({ onPagoRegistrado }) {
  const [formData, setFormData] = useState({
    registro: '',
    cliente: '',
    monto: '',
    metodoPago: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await registrarPago(formData);
    if (resultado.id) {
      alert('Pago registrado con éxito');
      onPagoRegistrado();
      setFormData({
        registro: '',
        cliente: '',
        monto: '',
        metodoPago: '',
      });
    } else {
      alert('Error: ' + (resultado.error || 'Error al registrar el pago'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="registro" placeholder="ID del Registro" onChange={handleChange} value={formData.registro} required />
      <input name="cliente" placeholder="ID del Cliente" onChange={handleChange} value={formData.cliente} required />
      <input name="monto" placeholder="Monto" onChange={handleChange} value={formData.monto} required />
      <input name="metodoPago" placeholder="Método de Pago" onChange={handleChange} value={formData.metodoPago} required />
      <button type="submit">Registrar Pago</button>
    </form>
  );
}

export default PagoForm;
