import PropTypes from "prop-types";
import NavLink from "../Utils/Link";
import Dropdown from "./Dropdown";
import { FaTachometerAlt, FaBuilding, FaCog, FaUnlockAlt, FaTrashAlt } from "react-icons/fa";

export default function UserSideBar({ user, colorStyle, iconstyle, linkstyle, onClick }) {
  const navItems = [
    { to: "/dashboard/user-db", icon: <FaTachometerAlt className={iconstyle} />, label: "Mon profil" },
    { to: "/dashboard/register-company", icon: <FaBuilding className={iconstyle} />, label: "Création Entreprise" },
    {
      type: "dropdown",
      icon: <FaCog className={iconstyle} />,
      label: "Sécurité Compte",
      dropdownItems: [
        { to: "/dashboard/update-password", icon: <FaUnlockAlt className={iconstyle} />, label: "Mot de passe" },
        { to: "/dashboard/deleteAccount", icon: <FaTrashAlt className={iconstyle} />, label: "Supprimer le compte" },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center p-2 gap-3">
        <img
          src={user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          alt="Profile"
          className="w-10 h-10 rounded-full bg-neutral-700"
        />
        <h2 className={`text-base font-semibold ${colorStyle}`}>{user ? user.username : "Guest"}</h2>
      </div>

      <div className="border-t border-neutral-800 my-3"></div>

      <ul className="space-y-1 text-sm">
        {navItems.map((item, i) =>
          item.type === "dropdown" ? (
            <Dropdown key={i} {...item} colorStyle={colorStyle} iconStyle={iconstyle} linkstyle={linkstyle} onClick={onClick} />
          ) : (
            <NavLink key={i} {...item} colorStyle={colorStyle} linkstyle={linkstyle} onClick={onClick} />
          )
        )}
      </ul>

      <div className="border-t border-neutral-800 my-3"></div>
    </div>
  );
}

UserSideBar.propTypes = {
  user: PropTypes.object,
  colorStyle: PropTypes.string,
  iconstyle: PropTypes.string,
  linkstyle: PropTypes.string,
  onClick: PropTypes.func,
};
