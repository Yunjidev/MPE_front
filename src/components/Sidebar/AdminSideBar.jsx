import PropTypes from "prop-types";
import NavLink from "../Utils/Link";
import {
  FaUserShield,
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaChartBar,
  FaChartLine,
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
      to: "/dashboard/admin-overview",
      icon: <FaTachometerAlt className={iconstyle} />,
      label: "Tableau de bord",
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
      label: "Liste des entreprises",
    },
    {
      to: "/dashboard/statistics",
      icon: <FaChartBar className={iconstyle} />,
      label: "Statistiques",
    },
    {
      to: "/dashboard/reports",
      icon: <FaChartLine className={iconstyle} />,
      label: "Reports",
    },
  ];

  return (
    <>
      {user && user.isAdmin && (
        <div className="flex flex-col flex-grow space-y-4">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <FaUserShield className="w-10 h-10 mr-2 fill-current dark:text-white text-black" />
            <div>
              <h3 className="lg:text-2xl text-4xl font-bold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">
                Dashboard
              </h3>
              <p className="lg:text-xs text-2xl dark:text-white text-black">
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
