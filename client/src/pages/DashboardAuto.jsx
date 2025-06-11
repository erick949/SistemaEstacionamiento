import AutoForm from '../components/AutoForm';
import AutoList from '../components/AutoList';
import { useState } from 'react';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Gestión de Autos</h1>
      <AutoForm onAutoCreado={() => setRefresh(!refresh)} />
      <AutoList key={refresh} />
    </div>
  );
}
