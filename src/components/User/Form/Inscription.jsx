import PropTypes from "prop-types";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Input from "../../Utils/Inputs/Input";

export default function Inscription({ fomData, onChange }) {
  return (
    <>
      <Input.Text
        id="username"
        value={fomData.username}
        onChange={onChange}
        placeholder="Nom d'utilisateur"
        icon={<FaUser />}
      />
      <Input.Text
        id="email"
        value={fomData.email}
        onChange={onChange}
        placeholder="Email"
        icon={<FaEnvelope />}
      />
    </>
  );
}

Inscription.propTypes = {
  fomData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
