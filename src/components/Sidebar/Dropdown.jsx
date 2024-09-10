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
  option = <></>,
  isDisabled = false,
  onClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-gray-700"
        onClick={toggleDropdown}
        disabled={isDisabled}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className={`font-semibold ${colorStyle}`}>{label}</span>
          {option}
        </div>
        <div>
          {!isOpen ? (
            <FaChevronDown className={iconStyle} />
          ) : (
            <FaChevronUp className={iconStyle} />
          )}
        </div>
      </button>
      {isOpen && (
        <ul className="pl-3 mt-2 space-y-1 lg:text-sm text-2xl">
          {dropdownItems.map((item, index) => (
            <NavLink
              key={index}
              {...item}
              colorStyle={colorStyle}
              linkstyle={linkstyle}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </>
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
