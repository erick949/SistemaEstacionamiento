import { useState } from 'react';
import { generarReporte } from '../api/reporte';
import './ReporteForm.css';

function ReporteForm() {
  const [formData, setFormData] = useState({
    tipoReporte: 'General',
    fechaInicio: '',
    fechaFin: '',
    usuario: '',
    resumen: '',
    observaciones: '',
  });

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generarContenidoPlantilla = (data) => {
    const getPlantillaPorTipo = (tipo) => {
      switch (tipo) {
        case 'General':
          return `Plantilla General:\nIncluye un resumen del estado general del sistema, estadísticas globales, y observaciones generales.`;
        case 'ActividadUsuarios':
          return `Plantilla Actividad de Usuarios:\nSe detalla la actividad reciente de los usuarios, incluyendo accesos, acciones realizadas y frecuencia de uso.`;
        case 'Estacionamientos':
          return `Plantilla Estacionamientos:\nMuestra información sobre la disponibilidad, ocupación, rotación y uso de los espacios de estacionamiento.`;
        case 'Financiero':
          return `Plantilla Financiera:\nContiene el resumen de ingresos, egresos, transacciones recientes y balance financiero del período.`;
        default:
          return 'Sin plantilla disponible.';
      }
    };

    const plantilla = getPlantillaPorTipo(data.tipoReporte);

    return `
--- REPORTE GENERADO AUTOMÁTICAMENTE ---

Tipo de Reporte: ${data.tipoReporte}
Fecha de Inicio: ${data.fechaInicio}
Fecha de Fin: ${data.fechaFin}
Usuario: ${data.usuario}

${plantilla}

Resumen:
${data.resumen}

Observaciones:
${data.observaciones}
-------------------------
    `.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResultado(null);

    // Validación manual por si el usuario ignora los required
    if (
      !formData.fechaInicio ||
      !formData.fechaFin ||
      !formData.usuario.trim() ||
      !formData.resumen.trim() ||
      !formData.observaciones.trim()
    ) {
      setError('Todos los campos deben estar completos.');
      return;
    }

    const contenidoFinal = generarContenidoPlantilla(formData);

    const res = await generarReporte({
      tipoReporte: formData.tipoReporte,
      contenido: contenidoFinal,
    });

    if (res.error) {
      setError(res.error);
    } else {
      setResultado(res);
    }
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'none',
    width: '100%',
  };

  return (
    <div className="contenedor-reporte">
      <form onSubmit={handleSubmit} className="formulario-reporte">
        <div className="fila fila-selectores">
          <select
            name="tipoReporte"
            value={formData.tipoReporte}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="General">General</option>
            <option value="ActividadUsuarios">ActividadUsuarios</option>
            <option value="Estacionamientos">Estacionamientos</option>
            <option value="Financiero">Financiero</option>
          </select>

          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="date"
            name="fechaFin"
            value={formData.fechaFin}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            placeholder="Usuario"
            required
            style={inputStyle}
          />
        </div>

        <div className="fila">
          <textarea
            name="resumen"
            value={formData.resumen}
            onChange={handleChange}
            rows={6}
            placeholder="Resumen del reporte aquí..."
            required
            style={inputStyle}
          />
        </div>

        <div className="fila">
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows={3}
            placeholder="Ninguna observación adicional."
            required
            style={inputStyle}
          />
        </div>

        <div className="fila centrado">
          <button type="submit" className="boton-enviar">Enviar</button>
        </div>
      </form>

      {error && <p className="error">Error: {error}</p>}
      {resultado && (
        <div className="resultado">
          <p>{resultado.mensaje}</p>
          <p>ID del reporte: {resultado.reporteId}</p>
          <p>Fecha: {resultado.fecha}</p>
          <a href={resultado.url} target="_blank" rel="noopener noreferrer">Descargar reporte</a>
        </div>
      )}
    </div>
  );
}

export default ReporteForm;
