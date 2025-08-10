import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { toast } from "react-toastify";
import Button from "../Button/button";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Input from "../Utils/Inputs/Input"; // doit exposer Input.Text et Input.SingleUpload
import Inscription from "./Form/Inscription";
import Edit from "./Form/Edit";

const innerWidthClass = "w-10/12 mx-auto";

export default function UserForm({ onSubmit, mode }) {
  const [user] = useAtom(userAtom);

  const isConnexion = mode === "Connexion";
  const isInscription = mode === "Inscription";
  const isEdit = mode === "Edition"; // IMPORTANT: on aligne sur "Edition"

  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hydrate le form en mode édition
  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        username: user?.username ?? "",
        email: user?.email ?? "",
        firstname: user?.firstname ?? "",
        lastname: user?.lastname ?? "",
        avatar: user?.avatar ?? null,
      });
    }
  }, [isEdit, user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAvatarChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      avatar: file || null,
      removeAvatar: !file || undefined,
    }));
  };

  const handleAvatarDelete = () => {
    setFormData((prev) => ({ ...prev, avatar: null, removeAvatar: true }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (isSubmitting) return;

    // Validation simple inscription
    if (isInscription && confirmPassword !== (formData.password || "")) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEdit) {
        // Envoi sélectif des champs modifiés
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          const val = formData[key];
          const initial = user?.[key];

          const shouldSend =
            val !== null &&
            val !== undefined &&
            val !== "" &&
            (val !== initial || (key === "removeAvatar" && val === true));

          if (shouldSend) {
            formDataToSend.append(key, val);
          }
        });

        await onSubmit(formDataToSend);
      } else {
        await onSubmit(formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative group">
      {/* Halo soft uniquement sur connexion/inscription */}
      {!isEdit && (
        <div className="pointer-events-none absolute -inset-[2px] rounded-2xl bg-[linear-gradient(120deg,rgba(139,92,246,.25),rgba(16,185,129,.25),rgba(251,146,60,.25))] opacity-70 blur-[2px]" />
      )}

      <div
        className={`
          relative z-10 rounded-2xl
          border border-neutral-800/80
          bg-neutral-900/80
          backdrop-blur-sm
          shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]
        `}
      >
        <div className={`${isEdit ? "p-6" : "p-8 lg:p-12"} ${innerWidthClass} max-w-3xl`}>
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{mode}</h2>
            {!isEdit && (
              <p className="mt-2 text-sm text-neutral-400">
                Entrez vos informations pour continuer.
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Upload avatar seulement en édition */}
            {isEdit && (
              <Input.SingleUpload
                placeholder="Sélectionnez un avatar"
                onFileUpload={handleAvatarChange}
                onFileDelete={handleAvatarDelete}
                url={formData.avatar}
                isEditMode={true}
              />
            )}

            {/* Connexion vs Inscription/Edition */}
            {isConnexion ? (
              <div className="space-y-4">
                <Input.Text
                  id="identifier"
                  value={formData.identifier || ""}
                  onChange={handleInputChange}
                  placeholder="Nom d'utilisateur / Email"
                  icon={<FaUser className="opacity-70" />}
                />
              </div>
            ) : (
              // ⚠️ Si tes sous-formulaires attendent `formData` et non `fomData`,
              // renomme la prop dans Inscription/Edit.
              <Inscription
                fomData={formData}
                onChange={handleInputChange}
                className={isEdit ? innerWidthClass : ""}
              />
            )}

            {/* Compléments spécifiques Edition */}
            {isEdit && (
              <Edit
                fomData={formData}
                onChange={handleInputChange}
                className={innerWidthClass}
              />
            )}

            {/* Mot de passe (Connexion & Inscription) */}
            {(isConnexion || isInscription) && (
              <Input.Text
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password || ""}
                onChange={handleInputChange}
                placeholder="Mot de passe"
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="p-1 -mr-1 rounded hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
              />
            )}

            {/* Confirmation (Inscription) */}
            {isInscription && (
              <Input.Text
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmation du mot de passe"
                icon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="p-1 -mr-1 rounded hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    aria-label={showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
              />
            )}

            {/* Actions */}
            <div className="pt-2">
              {isEdit ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full md:w-2/3 mx-auto block
                    rounded-2xl
                    border ${isSubmitting ? "border-neutral-700" : "border-neutral-700 hover:border-neutral-600"}
                    bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white
                    active:scale-[0.98]
                    font-medium py-3 px-6
                    transition-all duration-200
                    ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                  `}
                >
                  {isSubmitting ? "Sauvegarde…" : "Sauvegarder"}
                </button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi…" : mode}
                </Button>
              )}
            </div>

            {/* Lien mdp oublié */}
            {mode === "Connexion" && (
              <div className="text-right">
                <a
                  className="text-blue-400 hover:text-blue-300 text-sm underline underline-offset-4"
                  href="http://localhost:5173/forgot-password"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["Connexion", "Inscription", "Edition"]).isRequired,
};
