import PropTypes from "prop-types";

const InputText = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
  icon,
  type = "text",
}) => {
  const handleBlur = (e) => {
    const { id, value } = e.target;

    let errorMessage = "";
    switch (id) {
      case "name":
        if (value.length < 3 || value.length > 20) {
          errorMessage =
            "Le nom de l'entreprise doit être compris entre 3 et 20 caractères.";
        }
        break;
      case "siret":
        if (!/^\d{14}$/.test(value)) {
          errorMessage =
            "Le numéro SIRET doit contenir exactement 14 chiffres.";
        }
        break;
      case "contact":
        if (!/^\+?(\d.*){10,}$/.test(value)) {
          errorMessage = "Veuillez entrer un numéro de téléphone valide.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Veuillez entrer une adresse e-mail valide.";
        }
        break;
      case "address":
        if (value.length < 5) {
          errorMessage = "L'adresse doit contenir au moins 5 caractères.";
        }
        break;
      case "city":
        if (value.length < 2) {
          errorMessage =
            "Le nom de la ville doit contenir au moins 2 caractères.";
        }
        break;
      case "zipCode":
        if (!/^\d{5}$/.test(value)) {
          errorMessage = "Le code postal doit contenir exactement 5 chiffres.";
        }
        break;
      case "region":
        if (!value) {
          errorMessage = "Veuillez sélectionner une région.";
        }
        break;
      case "job":
        if (!value) {
          errorMessage = "Veuillez sélectionner un secteur d'activité.";
        }
        break;
      case "description":
        if (value.trim() === "") {
          errorMessage = "La description ne peut pas être vide.";
        }
        break;
      default:
        break;
    }

    e.target.setCustomValidity(errorMessage);
    e.target.reportValidity();
  };

  return (
    <div className="relative flex items-center">
      {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
      <label htmlFor={id} className="absolute left-3 text-gray-400">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400 ${className}`}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default InputText;

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  type: PropTypes.string,
};
