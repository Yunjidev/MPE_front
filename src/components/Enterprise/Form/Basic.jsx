import PropTypes from "prop-types";
import { FaUser, FaBarcode } from "react-icons/fa";
import { MdOutlineAreaChart } from "react-icons/md";
import Input from "../../Utils/Inputs/Input";

export default function Basic({ formData, jobOptions, onChange }) {
  return (
    <>
      <Input.Text
        id="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Nom Entreprise"
        icon={<FaUser />}
      />
      <Input.Text
        id="siret_number"
        value={formData.siret_number}
        onChange={onChange}
        placeholder="Numéro Siret"
        icon={<FaBarcode />}
      />
      <Input.Select
        id="Job_id"
        className="col-span-2"
        value={formData.Job_id}
        onChange={onChange}
        placeholder="Secteur d'activité"
        options={jobOptions}
        icon={<MdOutlineAreaChart />}
      />
    </>
  );
}

Basic.propTypes = {
  formData: PropTypes.object.isRequired,
  jobOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
