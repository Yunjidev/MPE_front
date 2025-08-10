import PropTypes from "prop-types";
import NavLink from "../Utils/Link";
import { FaUserShield, FaTachometerAlt, FaBuilding, FaUsers, FaPenFancy, FaEuroSign } from "react-icons/fa";

export default function AdminSideBar({ user, colorStyle, iconstyle, linkstyle, onClick }) {
  if (!user?.isAdmin) return null;

  const navItems = [
    { to: "/dashboard/admin-db", icon: <FaTachometerAlt className={iconstyle} />, label: "Tableau de Bord" },
    { to: "/dashboard/accept-company", icon: <FaBuilding className={iconstyle} />, label: "Validation Entreprises" },
    { to: "/dashboard/manage-users", icon: <FaUsers className={iconstyle} />, label: "Liste des utilisateurs" },
    { to: "/dashboard/manage-companies", icon: <FaBuilding className={iconstyle} />, label: <>Liste des entreprises<br />validées</> },
    { to: "/dashboard/jobsandcountrycreate", icon: <FaPenFancy className={iconstyle} />, label: "Gestion des métiers" },
    { to: "/dashboard/subscriptionmanagement", icon: <FaEuroSign className={iconstyle} />, label: "Gestion des abonnements" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 text-neutral-400 p-2">
        <FaUserShield className="w-6 h-6 text-neutral-200" />
        <div>
          <h3 className={`text-base font-semibold ${colorStyle}`}>Dashboard</h3>
          <p className="text-[11px] text-neutral-500">Admin</p>
        </div>
      </div>

      <ul className="pt-2 space-y-1 text-sm">
        {navItems.map((item, i) => (
          <li key={i}>
            <NavLink {...item} colorStyle={colorStyle} linkstyle={linkstyle} onClick={onClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}

AdminSideBar.propTypes = {
  user: PropTypes.object,
  colorStyle: PropTypes.string,
  iconstyle: PropTypes.string,
  linkstyle: PropTypes.string,
  onClick: PropTypes.func,
};
