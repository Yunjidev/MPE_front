import { useState, useEffect } from "react";
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
import { CgWebsite } from "react-icons/cg";
import { postData, getData } from "../../services/data-fetch";
import { useNavigate } from "react-router-dom";
import InputText from "./inputTextForm";
import InputSelect from "./inputSelectForm";

export default function RegisterCompany() {
  const navigate = useNavigate();

  const [logoUrl, setLogoUrl] = useState(null);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    mail: "",
    adress: "",
    city: "",
    zip_code: "",
    siret_number: "",
    description: "",
    twitter: "",
    instagram: "",
    facebook: "",
    website: "",
    Job_id: "",
    Country_id: "",
    logo: "",
    photos: [],
  });

  useEffect(() => {
    const fetchList = async () => {
      try {
        const lists = await getData("/search");
        setJobOptions(lists.jobs);
        setRegionOptions(lists.countries);
      } catch (error) {
        console.error("Failed to fetch lists:", error);
      }
    };
    fetchList();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== "" &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        if (key === "photos") {
          formData[key].forEach((photo) => {
            formDataToSubmit.append("photos", photo);
          });
        } else if (key === "logo") {
          formDataToSubmit.append("logo", formData[key]);
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }
    });
    try {
      const response = await postData("enterprise", formDataToSubmit);
      console.log("Response:", response);
      navigate(`/dashboard/user-db`);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
    alert("Entreprise enregistrée");
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, logo: file }));
    setLogoUrl(URL.createObjectURL(file));
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    if (photoUrls.length + files.length > 3) {
      setError("Vous ne pouvez ajouter que 3 photos");
      return;
    }
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileUrl = reader.result;
        setPhotoUrls((prevPhotoUrls) => [...prevPhotoUrls, fileUrl]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          photos: [...prevFormData.photos, file],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeletePhoto = (index) => {
    event.preventDefault();
    setPhotoUrls((prevPhotoUrls) =>
      prevPhotoUrls.filter((_, i) => i !== index),
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: prevFormData.photos.filter((_, i) => i !== index),
    }));
  };
  const isDisabled = photoUrls.length >= 3;

  return (
    <div className="mt-12 mb-8 flex items-center justify-center bg-neutral-900">
      <div className="relative border-form-1 group max-w-8xl w-full">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-10 rounded-xl shadow-xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-white text-center text-2xl mb-5">
            Création d&apos;entreprise
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
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    name: e.target.value,
                  }))
                }
                placeholder="Nom Entreprise"
                icon={<FaUser />}
              />
              <InputText
                id="siret"
                value={formData.siret_number}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    siret_number: e.target.value,
                  }))
                }
                placeholder="Numéro Siret"
                icon={<FaBarcode />}
              />
              <InputText
                id="contact"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    phone: e.target.value,
                  }))
                }
                placeholder="Contact"
                icon={<FaPhone />}
              />
              <InputText
                id="email"
                value={formData.mail}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    mail: e.target.value,
                  }))
                }
                placeholder="E-mail"
                icon={<MdOutlineAlternateEmail />}
              />
              <InputText
                id="address"
                value={formData.adress}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    adress: e.target.value,
                  }))
                }
                placeholder="Adresse"
                icon={<FaMapMarkerAlt />}
              />
              <InputSelect
                id="region"
                value={formData.Country_id}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    Country_id: e.target.value,
                  }))
                }
                placeholder="Région"
                options={regionOptions}
                icon={<MdOutlineAreaChart />}
              />
              <InputText
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    city: e.target.value,
                  }))
                }
                placeholder="Ville"
                icon={<FaCity />}
              />
              <InputText
                id="zipCode"
                value={formData.zip_code}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    zip_code: e.target.value,
                  }))
                }
                placeholder="Code Postal"
                icon={<FaBarcode />}
              />
              <InputSelect
                id="job"
                className="col-span-2"
                value={formData.Job_id}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    Job_id: e.target.value,
                  }))
                }
                placeholder="Secteur d'activité"
                options={jobOptions}
                icon={<MdOutlineAreaChart />}
              />
            </div>
            <InputText
              id="twitter"
              type="url"
              value={formData.twitter}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  twitter: e.target.value,
                }))
              }
              placeholder="Twitter"
              icon={<FaXTwitter />}
            />
            <InputText
              id="instagram"
              type="url"
              value={formData.instagram}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  instagram: e.target.value,
                }))
              }
              placeholder="Instagram"
              icon={<FaInstagram />}
            />
            <InputText
              id="facebook"
              type="url"
              value={formData.facebook}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  facebook: e.target.value,
                }))
              }
              placeholder="Facebook"
              icon={<FaFacebook />}
            />
            <div className="col-span-3 flex flex-col justify-center items-center">
              <div className="relative w-full">
                <CgWebsite className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      website: e.target.value,
                    }))
                  }
                  placeholder="Site Web"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400"
                />
              </div>
            </div>
            <div className="col-span-3 flex flex-col justify-center items-center">
              <div className="relative w-full">
                <FaPenAlt className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      description: e.target.value,
                    }));
                  }}
                  placeholder="Description"
                  className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400"
                  rows="5"
                />
              </div>
            </div>
            <div className="col-span-3 flex flex-col justify-center items-center">
              <label
                htmlFor="photos-upload"
                className="border border-dashed border-gray-500 p-10 h-30 w-full rounded-lg cursor-pointer text-gray-400 hover:bg-neutral-700 flex flex-row justify-center items-center"
              >
                <FaCloudUploadAlt className="w-16 h-16 mx-5" />
                <p className="text-white">Cliquez pour ajouter des images</p>
              </label>
              <input
                id="photos-upload"
                type="file"
                name="photos"
                multiple
                onChange={handlePhotosChange}
                className="hidden"
                disabled={isDisabled}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 w-full">
                {photoUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      key={index}
                      src={url}
                      alt={`Photo ${index + 1}`}
                      className="h-40 w-40 col-span-1 object-cover rounded-lg justify-self-center"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeletePhoto(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text items-center justify-center h-12 mr-2 border border-neutral-300 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Soumettre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterCompany.propTypes = {
  onSubmit: PropTypes.func,
};
