import ProfileManagement from '../../components/DashboardUser/EditProfilForm';
import LikesManagement from '../../components/DashboardUser/User_likes';
import AgendaManagement from '../../components/DashboardUser/User_agenda'

const Companydb = () => {
    return (
        <div className="bg-neutral-600 text-white p-6 rounded-lg max-w-4xl mx-auto mt-12 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Gestion du Profil</h2>
            <hr className="w-11/12 mb-12" />
            <div className="flex flex-wrap">
                {/* 1ère ligne : ProfileManagement et LikesManagement */}
                <div className="w-full md:w-1/2 pr-4 mb-4">
                    <ProfileManagement />
                </div>
                <div className="w-full md:w-1/2 pl-4 mb-4">
                    <LikesManagement />
                </div>
                {/* 2ème ligne : AgendaManagement */}
                <div className="w-full">
                    <AgendaManagement />
                </div>
            </div>
        </div>
    );
};

export default Companydb;
