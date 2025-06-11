import React, { useState } from 'react';
import DashboardAuto from './DashboardAuto';
import DashboardPersona from './DashboardPersona';
import DashboardReserva from './DashboardReserva';
import DashboardUsuario from './DashboardUsuario';
import DashboardRegistro from './DashboardRegistro';
import DashboardPago from './DashboardPago';
import DashboardReporte from './DashboardReporte';
import DashboardGrafica from './DashboardGraficas';

const DashboardAdmin = () => {
  const [seccionActiva, setSeccionActiva] = useState('graficas');
  const [mostrarAside, setMostrarAside] = useState(true);

  const renderContenido = () => {
    switch (seccionActiva) {
      case 'graficas': return <DashboardGrafica />;
      case 'autos': return <DashboardAuto />;
      case 'personas': return <DashboardPersona />;
      case 'reservas': return <DashboardReserva />;
      case 'usuarios': return <DashboardUsuario />;
      case 'registros': return <DashboardRegistro />;
      case 'pagos': return <DashboardPago />;
      case 'reporte': return <DashboardReporte />;
      default: return <div>Seleccione una sección</div>;
    }
  };

  const buttonStyle = {
    backgroundColor: '#ffffff10',
    border: 'none',
    color: '#ecf0f1',
    padding: '10px 15px',
    marginBottom: '10px',
    textAlign: 'left',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#ffffff20'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'system-ui, sans-serif' }}>
      {mostrarAside && (
        <aside style={{
          flex: '0 0 240px',
          background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
          color: '#ecf0f1',
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease-in-out',
        }}>
          <h2 style={{ marginBottom: '30px', fontSize: '22px', fontWeight: 'bold' }}>Administrador</h2>

          {['graficas', 'autos', 'personas', 'reservas', 'usuarios', 'pagos', 'registros', 'reporte'].map((seccion) => (
            <button
              key={seccion}
              onClick={() => setSeccionActiva(seccion)}
              style={{
                ...buttonStyle,
                ...(seccionActiva === seccion ? buttonHoverStyle : {})
              }}
            >
              {seccion.charAt(0).toUpperCase() + seccion.slice(1)}
            </button>
          ))}

          {/* Botón de Cerrar sesión */}
          <button
            onClick={() => {
              localStorage.removeItem('token'); // o cualquier otro valor de sesión
              window.location.href = '/login'; // redirige al login
            }}
            style={{
              ...buttonStyle,
              backgroundColor: '#e74c3c',
              marginTop: 'auto'
            }}
          >
            Cerrar sesión
          </button>
        </aside>
      )}

      <main style={{
        flexGrow: 1,
        padding: '30px',
        backgroundColor: '#f9f9fb',
        overflowY: 'auto',
        transition: 'all 0.3s ease-in-out',
        width: 0
      }}>
        {renderContenido()}
      </main>

      {/* Botón flotante */}
      <button
        onClick={() => setMostrarAside(!mostrarAside)}
        style={{
          position: 'fixed',
          top: '20px',
          left: mostrarAside ? '260px' : '20px',
          zIndex: 1000,
          backgroundColor: '#1e3c72',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          transition: 'left 0.3s ease, transform 0.2s',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title={mostrarAside ? 'Ocultar menú' : 'Mostrar menú'}
      >
        {mostrarAside ? '⮜' : '⮞'}
      </button>
    </div>
  );
};

export default DashboardAdmin;
