import React, { useState } from 'react';
import DashboardReserva from './DashboardReserva';
import DashboardPago from './DashboardPago';
import DashboardComentarios from './DashboardComentarios';


const DashboardCliente = () => {
  const [seccionActiva, setSeccionActiva] = useState('reservas');
  const [mostrarAside, setMostrarAside] = useState(true);

  const renderContenido = () => {
    switch (seccionActiva) {
      case 'reservas': return <DashboardReserva />;
      case 'pagos': return <DashboardPago />;
      case 'comentario': return <DashboardComentarios />

      
      default: return <div>Seleccione una sección</div>;
    }
  };

  const secciones = ['comentario', 'reservas', 'pagos'];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'system-ui, sans-serif' }}>
      {mostrarAside && (
        <aside style={{
          flex: '0 0 240px', // Ancho fijo
          background: 'linear-gradient(180deg, #11998e 0%, #38ef7d 100%)',
          color: '#fff',
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease-in-out'
        }}>
          <h2 style={{ marginBottom: '30px', fontSize: '22px', fontWeight: 'bold' }}>Cliente</h2>
          {secciones.map((seccion) => (
            <button
              key={seccion}
              onClick={() => setSeccionActiva(seccion)}
              style={{
                backgroundColor: seccionActiva === seccion ? '#ffffff20' : '#ffffff10',
                border: 'none',
                color: '#fff',
                padding: '10px 15px',
                marginBottom: '10px',
                textAlign: 'left',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {seccion.charAt(0).toUpperCase() + seccion.slice(1)}
            </button>
          ))}
        </aside>
      )}

      <main style={{
        flexGrow: 1, // Ocupa todo el espacio restante
        padding: '30px',
        backgroundColor: '#f9f9fb',
        overflowY: 'auto',
        transition: 'all 0.3s ease-in-out',
        width: 0 // Forzar que solo use el espacio sobrante
      }}>
        {renderContenido()}
      </main>

      <button
        onClick={() => setMostrarAside(!mostrarAside)}
        style={{
          position: 'fixed',
          top: '20px',
          left: mostrarAside ? '260px' : '20px',
          zIndex: 1000,
          backgroundColor: '#11998e',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          transition: 'left 0.3s ease'
        }}
      >
        {mostrarAside ? '⮜' : '⮞'}
      </button>
    </div>
  );
};

export default DashboardCliente;
