import ProfileManagement from '../../components/DashboardUser/EditProfilForm';
import LikesManagement from '../../components/DashboardUser/User_likes';
import AgendaManagement from '../../components/DashboardUser/User_agenda'
import ComManagement from '../../components/DashboardUser/Company_coms';

const Companydb = () => {
    return (
        <div className="dark:bg-neutral-900 bg-white text-white p-6 rounded-lg max-w-8xl mt-12 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#67FFCC]">Gestion du Profil</h2>
            <hr className="w-11/12 mb-12" />
            <div className="flex flex-wrap">
                {/* 1ère ligne : ProfileManagement et LikesManagement */}
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <ProfileManagement />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <LikesManagement />
                </div>
                {/* 2ème ligne : AgendaManagement */}
                <div className="w-full">
                    <AgendaManagement />
                </div>
                <div className="w-full">
                    <ComManagement />
                </div>
            </div>
        </div>
    );
};

export default Companydb;
