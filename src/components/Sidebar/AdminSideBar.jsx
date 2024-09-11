import PropTypes from "prop-types";
import NavLink from "../Utils/Link";
import {
  FaUserShield,
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaPenFancy,
  FaEuroSign,
} from "react-icons/fa";

export default function AdminSideBar({
  user,
  colorStyle,
  iconstyle,
  linkstyle,
  onClick,
}) {
  // Nav Items
  const navItems = [
    {
      to: "/dashboard/admin-db",
      icon: <FaTachometerAlt className={iconstyle} />,
      label: "Tableau de Bord",
    },
    {
      to: "/dashboard/accept-company",
      icon: <FaBuilding className={iconstyle} />,
      label: "Validation Entreprises",
    },
    {
      to: "/dashboard/manage-users",
      icon: <FaUsers className={iconstyle} />,
      label: "Liste des utilisateurs",
    },
    {
      to: "/dashboard/manage-companies",
      icon: <FaBuilding className={iconstyle} />,
      label: (
        <>
          Liste des entreprises
          <br />
          validées
        </>
      ),
    },
    {
      to: "/dashboard/jobsandcountrycreate",
      icon: <FaPenFancy className={iconstyle} />,
      label: (
        <>
          Gestion des jobs
          <br />
          et des régions
        </>
      ),
    },
    {
      to: "/dashboard/subscriptionmanagement",
      icon: <FaEuroSign className={iconstyle} />,
      label: "Gestion des abonnements",
    },
  ];

  return (
    <>
      {user && user.isAdmin && (
        <div className="flex flex-col flex-grow space-y-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <FaUserShield className="w-10 h-10 mr-2 fill-current text-white" />
            <div>
              <h3 className="lg:text-2xl text-4xl font-bold bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">
                Dashboard
              </h3>
              <p className="lg:text-xs text-2xl text-white">
                Admin
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-grow space-y-4">
            <ul className="pt-2 pb-4 space-y-1 lg:text-sm text-2xl">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    {...item}
                    colorStyle={colorStyle}
                    linkstyle={linkstyle}
                    onClick={onClick}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

AdminSideBar.propTypes = {
  user: PropTypes.object,
  colorStyle: PropTypes.string,
  iconstyle: PropTypes.string,
  linkstyle: PropTypes.string,
  onClick: PropTypes.func,
};
