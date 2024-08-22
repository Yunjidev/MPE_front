import PropTypes from "prop-types";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import Input from "../../Utils/Inputs/Input";

export default function SocialMedia({ formData, onChange }) {
  return (
    <>
      <Input.Text
        id="twitter"
        type="url"
        value={formData.twitter}
        onChange={onChange}
        placeholder="Twitter"
        icon={<FaXTwitter />}
      />
      <Input.Text
        id="instagram"
        type="url"
        value={formData.instagram}
        onChange={onChange}
        placeholder="Instagram"
        icon={<FaInstagram />}
      />
      <Input.Text
        id="facebook"
        type="url"
        value={formData.facebook}
        onChange={onChange}
        placeholder="Facebook"
        icon={<FaFacebook />}
      />
      <Input.Text
        id="website"
        type="url"
        value={formData.website}
        onChange={onChange}
        placeholder="Site Web"
        icon={<CgWebsite />}
        className="col-span-3"
      />
    </>
  );
}

SocialMedia.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
