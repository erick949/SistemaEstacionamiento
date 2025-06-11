// src/api/graficas.js
// const API_URL = 'http://localhost:8000'; // Cambia si es necesario
const API_URL = import.meta.env.VITE_API_URL;


// Petición dinámica al backend para obtener los ingresos por rango de fecha
export async function sumaPagos() {
  const response = await fetch(`${API_URL}pago/suma/?rango=mes`, {
    method: 'GET',
  });
  return await response.json();
}

export async function obtenerIngresosMensuales() {
  try {
    const datos = await sumaPagos();
    const ingresosMensuales = datos.map(dato => {
    const fecha = new Date(dato.name); 
    const diaNombre = `Día ${fecha.getDate()}`; // Resultado: Día 1, Día 2, ..
      return {
        name: diaNombre,
        ingresos: dato.ingresos
      };
    });
    return ingresosMensuales;
  } catch (error) {
    console.error('Error al obtener los ingresos mensuales:', error);
    return [];
  }
}




// Datos de tarjetas de resumen rápido
export const resumenRapido = [
  { icon: 'lnr lnr-dollar', value: '$15,800', label: 'Ingresos este mes' },
  { icon: 'lnr lnr-car', value: '420 Vehículos', label: 'Vehículos diarios' },
  { icon: 'lnr lnr-clock', value: '1200 Horas', label: 'Horas ocupadas este mes' },
  { icon: 'lnr lnr-license', value: '150 Espacios disponibles', label: 'Espacios totales' }
];

// Datos de tarjetas resumen final
export const resumenFinal = [
  { icon: 'lnr lnr-users', title: 'Usuarios Activos', value: '1,050', description: '5% incremento en las últimas 24 horas', iconTrend: 'ion ion-md-arrow-round-up ml-3 text-success' },
  { icon: 'lnr lnr-car', title: 'Vehículos en parqueo', value: '380', description: '10% incremento en el último mes', iconTrend: 'ion ion-md-arrow-round-up ml-3 text-success' },
  { icon: 'lnr lnr-star', title: 'Calificación promedio', value: '4.7 / 5', description: 'Basado en 420 opiniones', iconTrend: 'ion ion-md-arrow-round-up ml-3 text-success' },
  { icon: 'lnr lnr-diamond', title: 'Ingresos Totales', value: '$95,600', description: '20% aumento en los últimos 6 meses', iconTrend: 'ion ion-md-arrow-round-up ml-3 text-success' }
];

// Otros datos
export const datosGenerales = {
  vehiculosRegistrados: 1250,
  horasOcupacion: 3600
};
