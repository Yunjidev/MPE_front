import PropTypes from "prop-types";

export default function InputSelect({
  id,
  label,
  value = "",
  onChange,
  placeholder,
  className,
  icon,
  options,
}) {
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
        className={`w-full pl-10 px-3 py-2 rounded-xl bg-neutral-900 ${value ? "text-white" : "text-gray-400"} focus:outline-none focus:ring-green-400 focus:border-green-400`}
      >
        <option value="" disabled className="text-gray-400">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
InputSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
