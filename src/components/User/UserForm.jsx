import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import Button from "../Button/button";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Input from "../Utils/Inputs/Input";
import Inscription from "./Form/Inscription";
import Edit from "./Form/Edit";

export default function UserForm({ onSubmit, mode }) {
  const [user] = useAtom(userAtom);
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isConnexion = mode === "Connexion";
  const isInscription = mode === "Inscription";
  const isEdit = mode === "Edit";

  useEffect(() => {
    if (isEdit) {
      setFormData({
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
      });
    }
  }, [isEdit, user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleAvatarChange = (file) => {
    if (file) {
      setFormData((prevFormData) => ({ ...prevFormData, avatar: file }));
    }
  };

  const handleAvatarDelete = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: null,
      removeAvatar: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (
          formData[key] !== null &&
          formData[key] !== undefined &&
          formData[key] !== "" &&
          formData[key] !== user[key]
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });
      onSubmit(formDataToSend);
      return;
    }

    if (isInscription && confirmPassword !== formData.password) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="relative border-form-1 group">
      <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
      <div className="bg-neutral-900 p-16 rounded-xl shadow-2xl w-90 relative z-10">
        <h2 className="text-center text-3xl font-bold mb-10 text-white">
          {mode}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isEdit && (
            <Input.SingleUpload
              placeholder="Sélectionnez un avatar"
              onFileUpload={handleAvatarChange}
              onFileDelete={handleAvatarDelete}
              url={formData.avatar}
              isEditMode={true}
            />
          )}
          {isConnexion ? (
            <div>
              <Input.Text
                id="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                placeholder="Nom d'utilisateur/Email"
                icon={<FaUser />}
              />
            </div>
          ) : (
            <Inscription fomData={formData} onChange={handleInputChange} />
          )}
          {isEdit && <Edit fomData={formData} onChange={handleInputChange} />}
          {(isConnexion || isInscription) && (
            <Input.Text
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mot de passe"
              icon={
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          )}
          {isInscription && (
            <Input.Text
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmation mot de passe"
              icon={
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          )}
        </form>
        <Button type="submit" onClick={handleSubmit}>
          {mode}
        </Button>
        {mode === "Connexion" && (
          <a className="text-blue-500 hover:text-blue-800 text-sm" href="#">
            Mot de passe oublié ?
          </a>
        )}
      </div>
    </div>
  );
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["Connexion", "Inscription", "Edit"]).isRequired,
};