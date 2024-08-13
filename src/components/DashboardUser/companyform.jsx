/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaBarcode,
  FaPenAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { MdOutlineAlternateEmail, MdOutlineAreaChart } from "react-icons/md";
import Button from "../Button/button";
import { CgWebsite } from "react-icons/cg";
import { postData, getData } from "../../services/data-fetch";
import { UserContext } from "../../context/UserContext";

export default function RegisterCompany({ onSubmit }) {
  const { user } = useContext(UserContext); // Utilisation du contexte utilisateur

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [mail, setMail] = useState(user?.mail || "");
  const [adress, setAdress] = useState(user?.adress || "");
  const [city, setCity] = useState(user?.city || "");
  const [zipCode, setZipCode] = useState(user?.zipCode || "");
  const [siretNumber, setSiretNumber] = useState(user?.siretNumber || "");
  const [activity, setActivity] = useState("");
  const [twitter, setTwitter] = useState(user?.twitter || "");
  const [instagram, setInstagram] = useState(user?.instagram || "");
  const [facebook, setFacebook] = useState(user?.facebook || "");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [website, setWebsite] = useState(user?.website || "");
  const [photos, setPhotos] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  const [jobOptions, setJobOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  useEffect(() => {
    async function searchOptions() {
      const response = await getData("search");
      setJobOptions(response.jobs);
      setRegionOptions(response.countries);
    }
    searchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const company = {
      name,
      phone,
      mail,
      adress,
      city,
      zip_code: zipCode,
      siret_number: siretNumber,
      Job_id: activity,
      description,
      Country_id: region,
      twitter,
      instagram,
      facebook,
      website,
      logo,
      photos,
    };

    if (logo) {
      company.logo = logo;
    }

    photos.forEach((photo, index) => {
      company.photos[index] = photo;
    });

    try {
      const response = await postData("enterprise", company);
    } catch (error) {
      if (error.response) {
        // Handle the server response
        const status = error.response.status;
        if (status === 422) {
          // Parse and log the detailed error response
          const errorDetails = await error.response.json();
          console.log("Détails de l'erreur:", errorDetails);

          // Extract and display validation errors if available
          const validationErrors = errorDetails.errors || {};
          console.log("Erreurs de validation:", validationErrors);
        } else {
          // Handle other status codes
          const errorText = await error.response.text();
          console.log("Erreur non liée à la validation:", errorText);
        }
      } else {
        // Handle errors without a response
        console.log("Erreur sans réponse:", error.message);
      }
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.slice(0, 3 - photos.length);
    setPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);

    const newPhotoUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPhotoUrls((prevPhotoUrls) => [...prevPhotoUrls, ...newPhotoUrls]);
  };

  return (
    <div className="mt-12 mb-8 flex items-center justify-center bg-neutral-900">
      <div className="relative border-form-1 group max-w-8xl w-full">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-10 rounded-xl shadow-xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-white text-center text-2xl mb-5">
            Création d'entreprise
          </h2>
          <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-3 gap-3"
          >
            <div className="col-span-1 flex justify-center items-center">
              <label
                htmlFor="logo-upload"
                className="border border-gray-500 p-10 rounded-full cursor-pointer text-gray-400 hover:bg-neutral-700 h-56 w-56 flex flex-col justify-center items-center"
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <>
                    <p className="mt-2 text-center text-sm">
                      Cliquez pour ajouter votre logo
                    </p>
                  </>
                )}
              </label>
              <input
                id="logo-upload"
                type="file"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>
            <div className="flex flex-col lg:col-span-2 lg:grid lg:grid-cols-2 gap-5">
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
                  value={siretNumber}
                  onChange={(e) => setSiretNumber(e.target.value)}
                  placeholder="Numéro Siret"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative flex items-center">
                <FaPhone className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  id="contact"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contact"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative flex items-center justify-end">
                <MdOutlineAlternateEmail className="absolute left-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="E-mail"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative flex items-center">
                <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  id="address"
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
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
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="" className="text-gray-400">
                    Région
                  </option>
                  {regionOptions.map((option, index) => (
                    <option key={option} value={index + 1}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative flex items-center justify-end">
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
                <FaBarcode className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Code Postal"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="col-span-2 relative flex items-center">
                <MdOutlineAreaChart className="absolute left-3 text-gray-400" />
                <select
                  id="job"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="" className="text-gray-400">
                    Secteur d'activité
                  </option>
                  {jobOptions.map((option, index) => (
                    <option key={option.id} value={index + 1}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative flex items-center justify-end">
              <FaXTwitter className="absolute left-3 text-gray-400" />
              <input
                type="url"
                id="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="Twitter"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center justify-end">
              <FaInstagram className="absolute left-3 text-gray-400" />
              <input
                type="url"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="relative flex items-center justify-end">
              <FaFacebook className="absolute left-3 text-gray-400" />
              <input
                type="url"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-center items-center">
              <div className="relative w-full">
                <FaPenAlt className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows="3"
                />
              </div>
            </div>
            <div className="col-span-3 flex flex-col justify-center items-center">
              <div className="relative w-full">
                <CgWebsite className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="url"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Site Web"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
            <div className="col-span-3 flex flex-col justify-center items-center">
              <label
                htmlFor="photos-upload"
                className="border border-dashed border-gray-500 p-10 h-20 w-full rounded-lg cursor-pointer text-gray-400 hover:bg-neutral-700 flex flex-row justify-center items-center"
              >
                <FaCloudUploadAlt className="w-16 h-16 mx-5" />
                <p className="text-white">Cliquer pour ajouter des images</p>
              </label>
              <input
                id="photos-upload"
                type="file"
                name="photos"
                multiple
                onChange={handlePhotosChange}
                className="hidden"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 w-full">
                {photoUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Photo ${index + 1}`}
                    className="h-40 w-40 col-span-1 object-cover rounded-lg justify-self-center"
                  />
                ))}
              </div>
            </div>

          </form>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="rounded-lg px-5 py-2 bg-blue-600 hover:bg-blue-800 text-white"
            >
              Soumettre
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterCompany.propTypes = {
  onSubmit: PropTypes.func,
};
