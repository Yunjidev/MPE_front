import { useState } from "react";
import PropTypes from "prop-types";

export default function UserForm({ onSubmit, mode }) {
  const [identifier, setIdentifier] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "Connexion") {
      await onSubmit({ identifier, password });
    } else {
      await onSubmit({ username, email, password });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-sm border-2 border-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-green-400 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">{mode}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "Connexion" ? (
            <>
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-300">
                  Username ou Email
                </label>
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {mode}
          </button>
        </form>
      </div>
    </div>
  );
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["Connexion", "Enregistrement"]).isRequired,
};