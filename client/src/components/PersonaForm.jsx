import React, { useState } from 'react';
import { crearPersona } from '../api/persona';

function PersonaForm() {
  const [formData, setFormData] = useState({
    user: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await crearPersona(formData);
    console.log(response);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="user" placeholder="ID del usuario" onChange={handleChange} /> {/*  //Cambia esto por una lista de los que se puedan usar, que se muestre el nombre pero internamente se envie el id(de ese usuario) como asta ahora */}
     
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="direccion" placeholder="Dirección" onChange={handleChange} />
      <input type="date" name="fecha_nacimiento" onChange={handleChange} />
      <button type="submit">Crear Persona</button>
    </form>
  );
}

export default PersonaForm;
