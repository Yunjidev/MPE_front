// pages/Dashboard/Dashboard.js
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar est maintenant dans un conteneur flex */}
      <div className="flex-1 p-4 "> {/* Contenu principal avec un espace à gauche pour la sidebar */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
