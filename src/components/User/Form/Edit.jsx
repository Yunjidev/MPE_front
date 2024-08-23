import PropTypes from "prop-types";
import Input from "../../Utils/Inputs/Input";
import { FaUser } from "react-icons/fa";

export default function Edit({ fomData, onChange }) {
  return (
    <>
      <Input.Text
        id="lastname"
        value={fomData.lastname}
        onChange={onChange}
        placeholder="Nom"
        icon={<FaUser />}
      />
      <Input.Text
        id="firstname"
        value={fomData.firstname}
        onChange={onChange}
        placeholder="Prénom"
        icon={<FaUser />}
      />
    </>
  );
}

Edit.propTypes = {
  fomData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
