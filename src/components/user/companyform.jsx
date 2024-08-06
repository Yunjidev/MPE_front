import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity, FaBarcode,
  FaNetworkWired, FaPenAlt, FaCloudUploadAlt, FaSearch, FaPlus
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
  const [search, setSearch] = useState("");
  const [network, setNetwork] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, contact, email, address, city, zipcode, siret, search, network, description });
  };

  return (
    <div className="flex items-center justify-center h- bg-neutral-900">
      <div className="relative border-form-1 group max-w-4xl w-full p-6">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-10 rounded-xl shadow-2xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-white text-center text-2xl mb-5">Création d'entreprise</h2>
          <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-center items-center">
              <div className="border border-dashed border-gray-500 p-10 rounded-lg cursor-pointer text-gray-400 hover:bg-gray-800">
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
            <div className="relative flex items-center">
              <FaNetworkWired className="absolute right-3 text-gray-400" />
              <input
                type="text"
                id="network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                placeholder="Réseaux Sociaux"
                className="w-full pr-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaPlus className="absolute right-3 text-gray-400" />
              <input
                type="text"
                id="additional"
                placeholder="Ajouter"
                className="w-full pr-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center col-span-2">
              <FaSearch className="absolute left-3 text-gray-400" />
              <select
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Sélectionner une prestation</option>
                <option value="prestation1">Prestation 1</option>
                <option value="prestation2">Prestation 2</option>
                <option value="prestation3">Prestation 3</option>
              </select>
            </div>
            <div className="relative flex items-center col-span-2">
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
            <div className="col-span-2 flex justify-center">
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
