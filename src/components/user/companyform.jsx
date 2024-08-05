import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/button"; // Assurez-vous d'importer le composant Button

export default function RegisterCompany({ onSubmit }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [siret, setSiret] = useState("");
  const [search, setSearch] = useState("");
  const [network, setNetwork] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, contact, email, adress, city, zipcode, siret, search, network, description });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative border-form-1 group max-w-4xl w-full">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-16 rounded-xl shadow-2xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-center text-3xl font-bold mb-10 text-white">Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="w-full">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                id="adress"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                placeholder="Adresse"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Code Postal"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                id="siret"
                value={siret}
                onChange={(e) => setSiret(e.target.value)}
                placeholder="123 Numéro Siret"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="loupe"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                id="network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                placeholder="Réseaux sociaux"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-full">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de l'activité"
                className="mt-1 block border-none w-full px-3 py-2 shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] rounded-3xl bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="5"
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit">Envoyer</Button>
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
