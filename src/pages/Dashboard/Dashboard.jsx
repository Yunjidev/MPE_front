// pages/Dashboard/Dashboard.js
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex lg:flex-row">
      <Sidebar />
      <div className="flex-1 p-4"> {/* Le contenu principal avec un espace à gauche pour la sidebar */}
        <Outlet />
      </div>
    </div>
  );
};


export default Dashboard;
