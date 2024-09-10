import AdminStats from "../../components/DashboardAdmin/ComponentsForStatsAdmin/AdminStats";


const Admindb = () => {
  return (
    <div className="bg-neutral-900 text-white p-6 rounded-lg lg:mt-6 mt-16 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-[#67FFCC]">
        Tableau de Bord Admin
      </h2>
      <hr className=" mb-12" />
      <div>
          <AdminStats />
      </div>


    </div>
  );
};

export default Admindb;
