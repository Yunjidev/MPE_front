/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Input from "../../Utils/Inputs/Input";

export default function Inscription({ fomData, onChange, className }) {
  return (
    <>
      <Input.Text
        id="username"
        value={fomData.username}
        onChange={onChange}
        placeholder="Nom d'utilisateur"
        icon={<FaUser />}
        className={className}
      />
      <Input.Text
        id="email"
        value={fomData.email}
        onChange={onChange}
        placeholder="Email"
        icon={<FaEnvelope />}
        className={className}
      />
    </>
  );
}

Inscription.propTypes = {
  fomData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
