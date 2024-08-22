import PropTypes from "prop-types";
import { FaPhone, FaMapMarkerAlt, FaCity, FaBarcode } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdOutlineAreaChart } from "react-icons/md";
import Input from "../../Utils/Inputs/Input";

export default function ContactEnterprise({
  formData,
  countryOptions,
  onChange,
}) {
  return (
    <>
      <Input.Text
        id="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="Contact"
        icon={<FaPhone />}
      />
      <Input.Text
        id="mail"
        value={formData.mail}
        placeholder="E-mail"
        onChange={onChange}
        icon={<MdOutlineAlternateEmail />}
      />
      <Input.Text
        id="adress"
        value={formData.adress}
        onChange={onChange}
        placeholder="Adresse"
        icon={<FaMapMarkerAlt />}
      />
      <Input.Select
        id="Country_id"
        value={formData.Country_id}
        onChange={onChange}
        placeholder="Région"
        options={countryOptions}
        icon={<MdOutlineAreaChart />}
      />
      <Input.Text
        id="city"
        value={formData.city}
        onChange={onChange}
        placeholder="Ville"
        icon={<FaCity />}
      />
      <Input.Text
        id="zip_code"
        value={formData.zip_code}
        onChange={onChange}
        placeholder="Code Postal"
        icon={<FaBarcode />}
      />
    </>
  );
}

ContactEnterprise.propTypes = {
  formData: PropTypes.object.isRequired,
  countryOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
