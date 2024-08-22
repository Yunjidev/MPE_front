import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { FaPenAlt } from "react-icons/fa";
import { getData } from "../../services/data-fetch";
import Input from "../Utils/Inputs/Input";
import SocialMedia from "./Form/Social";
import Basic from "./Form/Basic";
import ContactEnterprise from "./Form/ContactEnterprise";

export default function EnterpriseForm({
  title,
  onSubmit,
  initialData = {},
  isEditMode = false,
}) {
  const [jobOptions, setJobOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [formData, setFormData] = useState({ photos: [], removePhotos: [] });
  const memoizedInitialData = useMemo(
    () => ({
      ...initialData,
      photos:
        initialData?.photos && Array.isArray(initialData.photos)
          ? initialData.photos
          : [],
    }),
    [initialData],
  );

  const fetchList = useCallback(async () => {
    try {
      const lists = await getData("/search");
      setJobOptions(lists.jobs);
      setRegionOptions(lists.countries);
    } catch (error) {
      console.error("Failed to fetch lists:", error);
    }
  }, []);
  const memoizedJobOptions = useMemo(() => jobOptions, [jobOptions]);
  const memoizedRegionOptions = useMemo(() => regionOptions, [regionOptions]);

  useEffect(() => {
    if (isEditMode && memoizedInitialData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: memoizedInitialData?.name || "",
        phone: memoizedInitialData?.phone || "",
        mail: memoizedInitialData?.mail || "",
        adress: memoizedInitialData?.adress || "",
        city: memoizedInitialData?.city || "",
        zip_code: memoizedInitialData?.zip_code || "",
        siret_number: memoizedInitialData?.siret_number || "",
        description: memoizedInitialData?.description || "",
        twitter: memoizedInitialData?.twitter || "",
        instagram: memoizedInitialData?.instagram || "",
        facebook: memoizedInitialData?.facebook || "",
        website: memoizedInitialData?.website || "",
        Job_id: memoizedInitialData?.job?.id || "",
        Country_id: memoizedInitialData?.country?.id || "",
        removePhotos: [],
        logo: memoizedInitialData?.logo || "",
        photos:
          memoizedInitialData?.photos &&
          Array.isArray(memoizedInitialData.photos)
            ? memoizedInitialData.photos
            : [],
      }));
    }
  }, [memoizedInitialData, isEditMode]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleLogoChange = (file) => {
    if (file) {
      setFormData((prevFormData) => ({ ...prevFormData, logo: file }));
    }
  };

  const handleLogoDelete = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      logo: null,
      removeLogo: true,
    }));
  };

  const handlePhotosChange = (file) => {
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        photos: [...prevFormData.photos, file],
      }));
    }
  };

  const handleDeletePhoto = (index) => {
    setFormData((prevFormData) => {
      const newPhotos = [...prevFormData.photos];
      newPhotos.splice(index, 1);
      const photosToRemove = [...prevFormData.removePhotos];
      if (
        initialData &&
        Array.isArray(initialData.photos) &&
        index < initialData.photos.length
      ) {
        photosToRemove.push(index);
      }
      return {
        ...prevFormData,
        photos: newPhotos,
        removePhotos: photosToRemove,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== initialData[key] &&
        formData[key] !== "" &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        if (key === "photos") {
          formData[key].forEach((photo) => {
            formDataToSubmit.append(key, photo);
          });
        } else if (key === "logo") {
          formDataToSubmit.append(key, formData[key]);
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }
    });
    onSubmit(formDataToSubmit);
  };

  return (
    <div className="mt-12 mb-8 flex items-center justify-center bg-neutral-900">
      <div className="relative group max-w-8xl w-full">
        <div className="bg-neutral-900 p-10 rounded-xl shadow-xl relative z-10 ">
          <h2 className="text-white text-center text-2xl mb-5">{title}</h2>
          <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-3 gap-3"
          >
            <Input.SingleUpload
              placeholder="Sélectionnez un logo"
              onFileUpload={handleLogoChange}
              onFileDelete={handleLogoDelete}
              url={formData.logo}
              className="col-span-1"
              isEditMode={isEditMode}
            />
            <div className="flex flex-col lg:col-span-2 lg:grid lg:grid-cols-2 gap-5">
              <Basic
                formData={formData}
                jobOptions={memoizedJobOptions}
                onChange={handleInputChange}
              />
              <ContactEnterprise
                formData={formData}
                countryOptions={memoizedRegionOptions}
                onChange={handleInputChange}
              />
            </div>
            <SocialMedia formData={formData} onChange={handleInputChange} />
            <Input.Text
              id="description"
              type="textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              icon={<FaPenAlt />}
              className="col-span-3 h-32"
              inputStyle="h-full"
            />
            <Input.MultipleUpload
              placeholder="Sélectionnez des images"
              onFileUpload={handlePhotosChange}
              onFileDelete={handleDeletePhoto}
              url={formData.photos}
              isEditMode={isEditMode}
            />
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

EnterpriseForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  initialData: PropTypes.object,
  isEditMode: PropTypes.bool,
};
