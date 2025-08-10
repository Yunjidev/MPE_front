import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaBook } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../../store/enterprises";

export default function EnterpriseSideBar({ colorStyle, iconStyle, linkstyle, onClick }) {
  const [enterprises] = useAtom(enterprisesAtom);

  return (
    <div className="flex flex-col">
      <div className="flex items-center p-2 gap-3 text-neutral-400">
        <FaBriefcase className="w-6 h-6 text-neutral-200" />
        <div>
          <h3 className={`text-base font-semibold ${colorStyle}`}>Entreprise</h3>
          <p className="text-[11px] text-neutral-500">Gestion des entreprises</p>
        </div>
      </div>

      <ul className="pt-2 space-y-1 text-sm">
        {(enterprises || []).map((enterprise) => (
          <li key={enterprise.id}>
            <Dropdown
              dropdownItems={[
                { to: `/dashboard/enterprise/${enterprise.id}/dashboard`, icon: <MdDashboard className={`w-5 h-5 ${iconStyle}`} />, label: "Tableau de Bord" },
                { to: `/dashboard/enterprise/${enterprise.id}/planning`, icon: <FaCalendarAlt className={`w-5 h-5 ${iconStyle}`} />, label: "Planning" },
                { to: `/dashboard/enterprise/${enterprise.id}/reservations`, icon: <FaBook className={`w-5 h-5 ${iconStyle}`} />, label: "Réservations" },
              ]}
              label={enterprise.name}
              icon={
                enterprise.logo ? (
                  <img src={enterprise.logo} alt="" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <FaBuilding className={`w-5 h-5 ${iconStyle}`} />
                )
              }
              linkstyle={linkstyle}
              colorStyle={`font-medium ${!enterprise.isValidate ? "text-neutral-400" : colorStyle}`}
              option={
                !enterprise.isValidate ? (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-800 ring-1 ring-neutral-700 text-neutral-400">
                    En validation…
                  </span>
                ) : null
              }
              isDisabled={!enterprise.isValidate}
              onClick={onClick}
            />
          </li>
        ))}
      </ul>

      <div className="border-t border-neutral-800 my-3"></div>
    </div>
  );
}

EnterpriseSideBar.propTypes = {
  colorStyle: PropTypes.string,
  iconStyle: PropTypes.string,
  linkstyle: PropTypes.string,
  onClick: PropTypes.func,
};
