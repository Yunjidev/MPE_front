import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity, FaBarcode,
  FaNetworkWired, FaPenAlt, FaCloudUploadAlt, FaSearch, FaPlus, FaTimes
} from "react-icons/fa";
import Button from "../Button/button";

export default function RegisterCompany({ onSubmit }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [siret, setSiret] = useState("");
  const [activity, setActivity] = useState("");
  const [networks, setNetworks] = useState([]);
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, contact, email, address, city, zipcode, siret, search, networks, description });
  };

  const handleAddNetwork = () => {
    if (currentNetwork.trim()) {
      setNetworks([...networks, currentNetwork.trim()]);
      setCurrentNetwork("");
    }
  };

  const handleRemoveNetwork = (index) => {
    setNetworks(networks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center bg-neutral-900 min-h-screen py-6">
      <div className="relative border-form-1 group max-w-4xl w-full p-6 md:p-8 lg:p-10">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-white text-center text-xl md:text-2xl mb-5">Création d'entreprise</h2>
          <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 flex justify-center items-center">
              <div className="border border-dashed border-gray-500 p-8 rounded-lg cursor-pointer text-gray-400 hover:bg-gray-800">
                <FaCloudUploadAlt size="3x" />
                <p className="mt-2">Cliquer pour ajouter des images</p>
              </div>
            </div>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom Entreprise"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaBarcode className="absolute right-3 text-gray-400" />
              <input
                type="text"
                id="siret"
                value={siret}
                onChange={(e) => setSiret(e.target.value)}
                placeholder="123 Numéro Siret"
                className="w-full pr-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaPhone className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute right-3 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full pr-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Adresse"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaCity className="absolute right-3 text-gray-400" />
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville"
                className="w-full pr-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Code Postal"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center col-span-1 sm:col-span-2">
              <FaNetworkWired className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="currentNetwork"
                value={currentNetwork}
                onChange={(e) => setCurrentNetwork(e.target.value)}
                placeholder="Réseaux Sociaux"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="button"
                onClick={handleAddNetwork}
                className="ml-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <FaPlus />
              </button>
            </div>
            <div className="col-span-1 sm:col-span-2">
              {networks.map((network, index) => (
                <div key={index} className="flex items-center mb-2 bg-neutral-800 p-2 rounded-xl">
                  <span className="text-white">{network}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveNetwork(index)}
                    className="ml-auto px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
            <div className="relative flex items-center col-span-1 sm:col-span-2">
              <FaSearch className="absolute left-3 text-gray-400" />
              <select
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Sélectionner une prestation</option>
                <option value="prestation1">Prestation 1</option>
                <option value="prestation2">Prestation 2</option>
                <option value="prestation3">Prestation 3</option>
              </select>
            </div>
            <div className="relative flex items-center col-span-1 sm:col-span-2">
              <FaPenAlt className="absolute left-3 text-gray-400" />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'activité"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 flex justify-center">
              <Button type="submit">Soumettre</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

RegisterCompany.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
