// pages/Dashboard/Dashboard.js
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Passer l'ID utilisateur à Sidebar */}
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
