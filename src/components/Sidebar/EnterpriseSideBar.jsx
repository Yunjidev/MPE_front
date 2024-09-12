import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaBuilding,
  FaBook  
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../../store/enterprises";
import { useSocketIo } from "../../services/UseSocketIo";

export default function EnterpriseSideBar({
  colorStyle,
  iconStyle, // Attention: ici, on garde l'uniformité avec iconStyle
  linkstyle,
  onClick,
}) {
  useSocketIo();

  const [enterprises] = useAtom(enterprisesAtom);

  return (
    <>
      <div className="flex flex-col flex-grow space-y-4">
        {/* Entête */}
        <div className="flex items-center p-2 space-x-4 text-gray-400">
          <FaBriefcase className="w-12 h-12 text-white" /> {/* Ajustement de la taille de l'icône */}
          <div>
            <h3 className={`lg:text-2xl text-4xl font-bold ${colorStyle}`}>
              Entreprise
            </h3>
            <p className="text-xs text-white">
              Gestion des entreprises
            </p>
          </div>
        </div>

        {/* Liste des entreprises */}
        <ul className="pt-2 pb-4 space-y-1 lg:text-sm text-lg"> {/* Taille du texte uniforme */}
          {enterprises &&
            enterprises.map((enterprise) => (
              <li key={enterprise.id}>
                <Dropdown
                  dropdownItems={[
                    {
                      to: `/dashboard/enterprise/${enterprise.id}/dashboard`,
                      icon: <MdDashboard className={`w-5 h-5 ${iconStyle} mr-3`} />, // Taille uniforme de l'icône
                      label: "Tableau de Bord",
                    },
                    {
                      to: `/dashboard/enterprise/${enterprise.id}/planning`,
                      icon: <FaCalendarAlt className={`w-5 h-5 ${iconStyle} mr-3`} />, // Taille uniforme de l'icône
                      label: "Planning",
                    },
                    {
                      to: `/dashboard/enterprise/${enterprise.id}/reservations`,
                      icon: <FaBook className={`${iconStyle} mr-3`} />,
                      label: "Réservations",
                    },
                  ]}
                  label={enterprise.name}
                  icon={
                    enterprise.logo ? (
                      <img
                        src={enterprise.logo}
                        alt="Logo de l'entreprise"
                        className="w-6 h-6 rounded-full" // Ajustement de la taille de l'image
                      />
                    ) : (
                      <FaBuilding className={`w-5 h-5 ${iconStyle}`} /> // Taille uniforme de l'icône
                    )
                  }
                  linkstyle={`hover:bg-gray-700 hover:text-white w-full p-2 space-x-3 rounded-md hover:bg-gray-700 ${linkstyle}`} // Ajout du hover
                  colorStyle={`font-semibold ${
                    !enterprise.isValidate ? "text-gray-400" : `${colorStyle}`
                  }`}
                  option={
                    !enterprise.isValidate ? (
                      <span className="text-xs font-medium px-1 py-0.5 rounded bg-red-900 text-gray-500">
                        En Validation ...
                      </span>
                    ) : null
                  }
                  isDisabled={!enterprise.isValidate}
                  onClick={onClick}
                />
              </li>
            ))}
        </ul>
      </div>

      {/* Ligne de séparation */}
      <div className="border-t border-white my-4 mx-2"></div>
    </>
  );
}

EnterpriseSideBar.propTypes = {
  colorStyle: PropTypes.string,
  iconStyle: PropTypes.string,
  linkstyle: PropTypes.string,
  onClick: PropTypes.func,
};