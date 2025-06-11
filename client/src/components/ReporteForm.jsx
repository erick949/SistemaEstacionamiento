import { useState } from 'react';
import { generarReporte } from '../api/reporte';
import './ReporteForm.css'; 

function ReporteForm() {
  const [formData, setFormData] = useState({
    tipoReporte: 'General',  // Valor por defecto
    fechaInicio: '',
    fechaFin: '',
    usuario: 'Usuario_Anonimo',
    resumen: 'Resumen del reporte aquí...',
    observaciones: 'Ninguna observación adicional.',
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
          return `Plantilla General:
Incluye un resumen del estado general del sistema, estadísticas globales, y observaciones generales.`;

        case 'ActividadUsuarios':
          return `Plantilla Actividad de Usuarios:
Se detalla la actividad reciente de los usuarios, incluyendo accesos, acciones realizadas y frecuencia de uso.`;

        case 'Estacionamientos':
          return `Plantilla Estacionamientos:
Muestra información sobre la disponibilidad, ocupación, rotación y uso de los espacios de estacionamiento.`;

        case 'Financiero':
          return `Plantilla Financiera:
Contiene el resumen de ingresos, egresos, transacciones recientes y balance financiero del período.`;

        default:
          return 'Sin plantilla disponible.';
      }
    };

    const plantilla = getPlantillaPorTipo(data.tipoReporte);

    return `
--- REPORTE GENERADO AUTOMÁTICAMENTE ---

Tipo de Reporte: ${data.tipoReporte}
Fecha de Inicio: ${data.fechaInicio || 'No especificada'}
Fecha de Fin: ${data.fechaFin || 'No especificada'}
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

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">

        <select
          name="tipoReporte"
          value={formData.tipoReporte}
          onChange={handleChange}
          required
          className="border p-2 rounded"
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
        />

        <input
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          onChange={handleChange}
        />

        <input
          name="usuario"
          placeholder="Nombre del usuario"
          value={formData.usuario}
          onChange={handleChange}
        />

        <textarea
          name="resumen"
          placeholder="Resumen del reporte"
          value={formData.resumen}
          onChange={handleChange}
          rows={5}
        />

        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          rows={3}
        />

        <button
          type="submit"
          className="boton-moderno"
        >
          Enviar
        </button>

      </form>

      {error && <p className="text-red-500">Error: {error}</p>}

      {resultado && (
        <div className="mt-4">
          <p>{resultado.mensaje}</p>
          <p>ID del reporte: {resultado.reporteId}</p>
          <p>Fecha: {resultado.fecha}</p>
          <a
            href={resultado.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            Descargar reporte
          </a>
        </div>
      )}
    </div>
  );
}

export default ReporteForm;
