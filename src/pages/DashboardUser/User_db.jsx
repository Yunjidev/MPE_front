import EditProfilForm from "../../components/User/EditProfilForm";
import LikesManagement from "../../components/DashboardUser/User_likes";
import UserAgenda from "@/components/DashboardUser/User_agenda";
import ComManagement from "../../components/DashboardUser/Company_coms";

const Companydb = () => {
  return (
    <div className="dark:bg-neutral-900 w-full bg-white text-white p-6 rounded-lg w-full lg:mt-6 mt-16 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-[#67FFCC]">
        Gestion du Profil
      </h2>
      <hr className=" mb-12" />
      <div className="flex flex-wrap">
        {/* 1ère ligne : ProfileManagement et LikesManagement */}
        <div className="lg:w-1/2 px-2 mb-4">
          <EditProfilForm />
        </div>
        <div className="lg:w-1/2 px-2 mb-4">
          <LikesManagement />
        </div>
        {/* 2ème ligne : AgendaManagement */}
        <div className="w-full">
          <UserAgenda />
        </div>
        <div className="w-full">
          <ComManagement />
        </div>
      </div>
    </div>
  );
};

export default Companydb;
