import PropTypes from "prop-types";

export default function Button({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full h-12 bg-gray-800 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
