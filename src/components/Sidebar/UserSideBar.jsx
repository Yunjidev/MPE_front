import PropTypes from "prop-types";
import NavLink from "../Utils/Link";
import Dropdown from "./Dropdown";
import {
  FaTachometerAlt,
  FaBuilding,
  FaCog,
  FaUnlockAlt,
  FaTrashAlt,
} from "react-icons/fa";

export default function UserSideBar({
  user,
  colorStyle,
  iconstyle,
  linkstyle,
  onClick,
}) {
  // Nav Items
  const navItems = [
    {
      to: "/dashboard/user-db",
      icon: <FaTachometerAlt className={iconstyle} />,
      label: "Mon profil",
    },
    {
      to: "/dashboard/register-company",
      icon: <FaBuilding className={iconstyle} />,
      label: "Création Entreprise",
    },
    {
      type: "dropdown",
      icon: <FaCog className={iconstyle} />,
      label: "Sécurité Compte",
      dropdownItems: [
        {
          to: "/dashboard/update-password",
          icon: <FaUnlockAlt className={iconstyle} />,
          label: "Modification Mot de passe",
        },
        {
          to: "/dashboard/deleteAccount",
          icon: <FaTrashAlt className={iconstyle} />,
          label: "Suppression du compte",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col flex-grow space-y-4">
      <div className="flex items-center p-2 space-x-4 ">
        <img
          src={
            user?.avatar ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt="Profile"
          className="w-12 h-12 rounded-full bg-gray-500"
        />
        <div>
          <h2 className={`lg:text-2xl text-4xl font-bold ${colorStyle}`}>
            {user ? user.username : "Guest"}
          </h2>
        </div>
      </div>

      <div className="border-t border-white my-4 mx-2"></div>
      <ul className="pt-2 pb-4 space-y-1 lg:text-sm text-2xl">
        {navItems.map((item, index) =>
          item.type === "dropdown" ? (
            <Dropdown
              key={index}
              {...item}
              colorStyle={colorStyle}
              iconstyle={iconstyle}
              linkstyle={linkstyle}
              onClick={onClick}
              option={<></>}
            />
          ) : (
            <NavLink
              key={index}
              {...item}
              colorStyle={colorStyle}
              linkstyle={linkstyle}
              onClick={onClick}
            />
          ),
        )}
      </ul>
      <div className="border-t border-white my-4 mx-2"></div>
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
