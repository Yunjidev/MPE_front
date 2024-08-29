import PropTypes from "prop-types";

export default function CheckboxInput({
  id,
  label,
  name,
  value,
  onChange,
  checked,
  className,
  iconClass,
  icon,
}) {
  return (
    <div className={`flex items-center ${className}`}>
      {icon && <span className={`${iconClass}`}>{icon}</span>}
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}

CheckboxInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  icon: PropTypes.string,
};
