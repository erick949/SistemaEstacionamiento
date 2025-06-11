
import React from 'react';
import RegistroList from '../components/RegistroList';
import RegistroForm from '../components/RegistroForm';

const DashboardRegistro = () => {
  const [reload, setReload] = React.useState(false);

  const recargar = () => setReload(!reload);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Registros</h1>
      <RegistroForm onRegistroCreado={recargar} />
      <RegistroList key={reload} />
    </div>
  );
};

export default DashboardRegistro;
