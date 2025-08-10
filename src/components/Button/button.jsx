import PropTypes from "prop-types";

export default function Button({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full mt-5 h-12 rounded-xl font-medium
                 bg-neutral-800 text-neutral-200
                 border border-neutral-700
                 hover:bg-neutral-700 hover:text-white
                 active:scale-[0.98]
                 transition-all duration-200 ease-in-out"
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
