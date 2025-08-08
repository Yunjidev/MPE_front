import PropTypes from "prop-types";

export default function InputText({
  id,
  value = "",
  onChange,
  placeholder,
  className="",
  inputStyle="",
  icon,
  type = "text",
}) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
      <input
        type={type}
        id={id}
        value={value !== null ? value : ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputStyle} block ps-9 border-none w-full h-full shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-xl bg-neutral-900 text-white text-start focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400`}
      />
    </div>
  );
}
InputText.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  type: PropTypes.string,
  inputStyle: PropTypes.string,
};
