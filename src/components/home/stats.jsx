/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { getData } from '../../services/data-fetch';
import { FaUsers, FaBuilding} from 'react-icons/fa';
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";

const Statistique = () => {
  const [stats, setStats] = useState({
    userLength: 0,
    entrepreneurLength: 0,
    enterpriseLength: 0,
    premiumEnterpriseLength: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getData('stats');
        setStats(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-white to-violet-400 text-transparent bg-clip-text">
              Ma petite entreprise en chiffres
            </h2>
            <p className="text-lg leading-8 text-white">
              Explorez les statistiques clés qui témoignent du succès et de l'ampleur de notre plateforme.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-center bg-white/5 p-8">
              <FaUsers className="text-4xl text-violet-400 mr-4" />
              <div className="text-left">
                <dt className="text-sm font-semibold leading-6 text-white">Utilisateurs</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white text-center">
                  {stats.userLength}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/5 p-8">
              <FaBuildingUser className="text-4xl text-violet-400 mr-4" />
              <div className="text-left">
                <dt className="text-sm font-semibold leading-6 text-white">Entrepreneurs</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white text-center">
                  {stats.entrepreneurLength}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/5 p-8">
              <FaBuilding className="text-4xl text-violet-400 mr-4" />
              <div className="text-left">
                <dt className="text-sm font-semibold leading-6 text-white">Entreprises</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white text-center">
                  {stats.enterpriseLength}
                </dd>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/5 p-8">
              <MdOutlineWorkspacePremium className="text-4xl text-violet-400 mr-4" />
              <div className="text-left">
                <dt className="text-sm font-semibold leading-6 text-white">Entreprises Premium</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white text-center">
                  {stats.premiumEnterpriseLength}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Statistique;
