// pages/Dashboard/Dashboard.js
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="2xl:ml-44 2xl:mr-40">
    <div className="flex lg:flex-row">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
    </div>
  );
};


export default Dashboard;
