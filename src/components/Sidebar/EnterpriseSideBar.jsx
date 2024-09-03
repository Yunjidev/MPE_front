import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaPlusCircle,
  FaEye,
  FaBuilding,
  FaBook,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../../store/enterprises";
import { useSocketIo } from "../../services/UseSocketIo";

export default function EnterpriseSideBar({
  colorStyle,
  iconStyle,
  linkstyle,
  onClick,
}) {
  useSocketIo();

  const [enterprises] = useAtom(enterprisesAtom);

  return (
    <>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <FaBriefcase className="w-10 h-10 mr-2 dark:text-white text-black" />
          <div>
            <h3 className={`lg:text-2xl text-4xl font-bold ${colorStyle}`}>
              Entreprise
            </h3>
            <p className="text-xs dark:text-white text-black">
              Gestion des entreprises
            </p>
          </div>
        </div>
        <ul className="pt-2 pb-4 space-y-1 lg:text-sm text-2xl">
          {enterprises &&
            enterprises.map((enterprise) => (
              <li key={enterprise.id}>
                <div>
                  <Dropdown
                    dropdownItems={[
                      {
                        to: `/dashboard/enterprise/${enterprise.id}/dashboard`,
                        icon: <MdDashboard className={`${iconStyle} mr-3`} />,
                        label: "Tableau de Bord",
                      },
                      {
                        to: `/dashboard/enterprise/${enterprise.id}/planning`,
                        icon: <FaCalendarAlt className={`${iconStyle} mr-3`} />,
                        label: "Planning",
                      },
                      {
                        to: `/dashboard/enterprise/${enterprise.id}/edit`,
                        icon: <FaEdit className={`${iconStyle} mr-3`} />,
                        label: "Édition",
                      },
                      {
                        to: `/dashboard/enterprise/${enterprise.id}/offer`,
                        icon: <FaPlusCircle className={`${iconStyle} mr-3`} />,
                        label: "Offres",
                      },
                      {
                        to: `/dashboard/enterprise/${enterprise.id}/reservations`,
                        icon: <FaBook className={`${iconStyle} mr-3`} />,
                        label: "Réservations",
                      },
                      {
                        to: `/enterprise/${enterprise.id}`,
                        icon: <FaEye className={`${iconStyle} mr-3`} />,
                        label: "Ma page entreprise",
                      },
                    ]}
                    label={enterprise.name}
                    icon={
                      enterprise.logo ? (
                        <img
                          src={enterprise.logo}
                          alt="Logo de l'entreprise"
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <FaBuilding className={iconStyle} />
                      )
                    }
                    linkstyle={linkstyle}
                    colorStyle={`font-semibold ${
                      !enterprise.isValidate
                        ? "text-gray-500 dark:text-gray-400"
                        : `${colorStyle}`
                    } `}
                    option={
                      !enterprise.isValidate ? (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-1 py-0.5 rounded dark:bg-red-900 dark:text-gray-500">
                          En Validation ...
                        </span>
                      ) : null
                    }
                    isDisabled={!enterprise.isValidate}
                    onClick={onClick}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="border-t border-black dark:border-white my-4 mx-2"></div>
    </>
  );
}

EnterpriseSideBar.propTypes = {
  colorStyle: PropTypes.string,
  iconStyle: PropTypes.string,
  linkstyle: PropTypes.string,
  onClick: PropTypes.func,
};
