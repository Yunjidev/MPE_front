import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/button"; // Import du composant Button
import './form.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import des icônes d'œil

export default function UserForm({ onSubmit, mode }) {
  const [identifier, setIdentifier] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nouvel état pour la confirmation du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // État pour afficher/cacher la confirmation du mot de passe

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "Connexion") {
      await onSubmit({ identifier, password });
    } else {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }
      await onSubmit({ username, email, password });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative border-form-1 group">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-16 rounded-xl shadow-2xl w-90 relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-center text-3xl font-bold mb-10 text-white">{mode}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "Connexion" ? (
              <div>
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Nom d'utilisateur/Email"
                  className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="relative mt-5">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                    className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div className="relative mt-5">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="relative mt-5">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmation mot de passe"
                    className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </>
            )}
            <Button type="submit">{mode === "Inscription" ? "S'inscrire" : mode}</Button>
            <a className="text-blue-500 hover:text-blue-800 text-sm" href="#">
              Mot de passe oublié ?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["Connexion", "Inscription"]).isRequired,
};
