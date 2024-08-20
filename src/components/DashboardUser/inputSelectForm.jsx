import PropTypes from "prop-types";

const InputSelect = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
  icon,
  options,
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
      <label htmlFor={id} className="absolute left-3 text-gray-400">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-gray-400 focus:outline-none focus:ring-green-400 focus:border-green-400`}
      >
        {options.map((option, index) => (
          <option key={option.id} value={index + 1}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;

InputSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
