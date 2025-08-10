import PropTypes from "prop-types";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import NavLink from "../Utils/Link";

export default function Dropdown({
  dropdownItems,
  label,
  icon,
  colorStyle = "",
  iconStyle = "",
  linkstyle = "",
  option = null,
  isDisabled = false,
  onClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => !isDisabled && setIsOpen((s) => !s);

  return (
    <div className={`rounded-lg ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      <button
        className={`flex items-center justify-between w-full ${linkstyle}`}
        onClick={toggleDropdown}
        disabled={isDisabled}
        type="button"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0">{icon}</span>
          <span className={`font-semibold truncate ${colorStyle}`}>{label}</span>
          {option && <span className="shrink-0">{option}</span>}
        </div>
        <div className="shrink-0 text-neutral-400">
          {!isOpen ? <FaChevronDown className={iconStyle} /> : <FaChevronUp className={iconStyle} />}
        </div>
      </button>

      {isOpen && !isDisabled && (
        <ul className="pl-3 mt-2 space-y-1 lg:text-sm text-base">
          {dropdownItems.map((item, index) => (
            <NavLink key={index} {...item} colorStyle={colorStyle} linkstyle={linkstyle} onClick={onClick} />
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  dropdownItems: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  colorStyle: PropTypes.string,
  iconStyle: PropTypes.string,
  linkstyle: PropTypes.string,
  option: PropTypes.element,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
