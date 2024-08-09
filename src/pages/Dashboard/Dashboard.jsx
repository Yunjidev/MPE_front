// pages/Dashboard/Dashboard.js
import { Outlet, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashboard = () => {
  const { id } = useParams(); // Extraire l'ID utilisateur depuis les paramètres de la route

  return (
    <div className="flex">
      <Sidebar userId={id} /> {/* Passer l'ID utilisateur à Sidebar */}
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
