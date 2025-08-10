import EditProfilForm from "../../components/User/EditProfilForm";
import LikesManagement from "../../components/DashboardUser/User_likes";
import UserAgenda from "@/components/DashboardUser/User_agenda";
import CommentsOfUser from "@/components/DashboardUser/Company_coms";

const Companydb = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-900 to-black text-white py-8 lg:py-12 mt-6 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <header className="mb-8 lg:mb-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Tableau de bord
            </h1>
            <span className="inline-flex items-center gap-2 text-sm text-emerald-300/80">
              <span className="block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Profil connecté
            </span>
          </div>
          <p className="mt-2 text-neutral-400">
            Gérez votre profil, vos favoris, vos réservations et vos avis.
          </p>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Col gauche */}
          <section className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm p-5 lg:p-6 shadow-[0_0_15px_-6px] shadow-emerald-500/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-emerald-300">Gestion du profil</h2>
              </div>
              <EditProfilForm />
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm p-5 lg:p-6 shadow-[0_0_15px_-6px] shadow-violet-500/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                  Mes commentaires
                </h2>
              </div>
              <CommentsOfUser />
            </div>
          </section>

          {/* Col droite */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm p-5 lg:p-6 shadow-[0_0_15px_-6px] shadow-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-cyan-300">Mes favoris</h2>
              </div>
              <LikesManagement />
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm p-5 lg:p-6 shadow-[0_0_15px_-6px] shadow-orange-500/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-orange-300">Mes réservations</h2>
              </div>
              <UserAgenda />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Companydb;
