import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity, FaBarcode,
  FaPenAlt, FaCloudUploadAlt, FaSearch,
} from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { MdOutlineAlternateEmail, MdOutlineAreaChart } from "react-icons/md";
import Button from "../Button/button";
import regions from "../enterprise/region-names.jsx";

export default function RegisterCompany({ onSubmit }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [siret, setSiret] = useState("");
  const [activity, setActivity] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, contact, email, address, city, zipcode, siret, search, network, description });
  };

  return (
    <div className="flex items-center justify-center bg-neutral-900">
      <div className="relative border-form-1 group max-w-8xl w-full p-1">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-10 rounded-xl shadow-xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-white text-center text-2xl mb-5">Création d'entreprise</h2>
          <hr className="w-1/2 my-4 border-t-2 border-gray-400  mx-auto" />
          <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-3 gap-4">

            {/* Image Upload */}
            <div className="col-span-1 flex justify-center items-center">
              <div className="border border-gray-500 p-10 rounded-full cursor-pointer text-gray-400 hover:bg-gray-800 h-56 w-56 flex flex-col justify-center items-center">
                <p className="mt-2 text-center text-sm">Cliquez pour ajouter votre logo</p>
              </div>
            </div>


            {/* Fields to the right of the image upload */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {/* Name, Siret, Contact, Email Fields */}
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
              <div className="relative flex items-center justify-end">
                <FaBarcode className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  id="siret"
                  value={siret}
                  onChange={(e) => setSiret(e.target.value)}
                  placeholder="Numéro Siret"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
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
              <div className="relative flex items-center justify-end">
                <MdOutlineAlternateEmail className="absolute left-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
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
                <MdOutlineAreaChart className="absolute left-3 text-gray-400" />
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Sélectionner une région</option>
                  {regions.map((regionName, index) => (
                    <option key={index} value={regionName}>
                      {regionName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="relative flex items-center">
                  <FaCity className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ville"
                    className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
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
              </div>
            </div>
            <div className="relative flex items-center">
              <FaXTwitter className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="Twitter"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaInstagram className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center">
              <FaFacebook className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="relative flex items-center col-span-3">
              <FaFacebook className="absolute left-3 text-gray-400" />
              <input
                type="text"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Site internet"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Dropdown */}
            <div className="relative flex items-center col-span-3">
              <FaSearch className="absolute left-3 text-gray-400" />
              <select
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Sélectionner votre métier</option>
                <option value="prestation1">Métier 1</option>
                <option value="prestation2">Métier 2</option>
                <option value="prestation3">Métier 3</option>
              </select>
            </div>

            {/* Description */}
            <div className="relative flex items-center col-span-3">
              <FaPenAlt className="absolute left-3 top-3 text-gray-400" />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'activité"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-1 flex justify-center items-center">
              <div className="border border-dashed border-gray-500 p-10 rounded-lg cursor-pointer text-gray-400 hover:bg-gray-800">
                <FaCloudUploadAlt size="3x" />
                <p className="mt-2">Cliquer pour ajouter des images</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-3 flex justify-center">
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