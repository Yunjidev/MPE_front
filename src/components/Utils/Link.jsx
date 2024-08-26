import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function NavLink({
  to,
  icon,
  label,
  onClick,
  linkstyle,
  colorStyle,
}) {
  return (
    <Link
      to={to}
      className={`flex items-center rounded-md ${linkstyle}`}
      onClick={onClick}
    >
      {icon}
      <span className={`font-semibold ${colorStyle}`}>{label}</span>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  linkstyle: PropTypes.string,
  colorStyle: PropTypes.string,
};
