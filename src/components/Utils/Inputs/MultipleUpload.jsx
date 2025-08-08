import { useState, useEffect, useCallback, useMemo } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import PropTypes from "prop-types";

export default function MultipleUpload({
  onFileUpload,
  onFileDelete,
  placeholder,
  url = [],
  isEditMode,
  maxPhotos = 3,
}) {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [error, setError] = useState(null);
  const memoizedUrl = useMemo(() => {
    return url.map((item) => {
      if (typeof item === "string") {
        return item;
      } else if (item instanceof File) {
        return URL.createObjectURL(item);
      }
      return "";
    });
  }, [url]);

  useEffect(() => {
    if (
      isEditMode &&
      JSON.stringify(memoizedUrl) !== JSON.stringify(photoUrls)
    ) {
      setPhotoUrls([...memoizedUrl]);
    }
  }, [memoizedUrl, photoUrls, isEditMode]);

  const handlePhotosChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (photoUrls.length + files.length > 3) {
        setError("Vous ne pouvez ajouter que 3 photos");
        return;
      }
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setPhotoUrls((prevPhotoUrls) => [...prevPhotoUrls, ...newUrls]);
      files.forEach((file) => {
        if (onFileUpload) {
          onFileUpload(file);
        }
      });
    },
    [photoUrls, onFileUpload],
  );

  const handleDeletePhoto = (index) => {
    event.preventDefault();
    setPhotoUrls((prevPhotoUrls) => {
      const newUrls = prevPhotoUrls.filter((_, i) => i !== index);
      if (onFileDelete) {
        onFileDelete(index);
      }
      return newUrls;
    });
  };

  const isDisabled = photoUrls.length >= maxPhotos;

  return (
    <div className="col-span-3 w-full">
      <label
        htmlFor="photos-upload"
        className={`border ${isDisabled ? "border-gray-500" : "border-dashed hover:bg-neutral-700 cursor-pointer"} p-10 h-30 w-full rounded-lg  text-gray-400  flex flex-row justify-center items-center`}
      >
        <FaCloudUploadAlt
          className={`${isDisabled ? "text-red-500" : ""} w-16 h-16 mx-5`}
        />
        <p className={`${isDisabled ? "text-red-500" : "text-white"}`}>
          {isDisabled
            ? `Vous avez déjà ajouté ${maxPhotos} photos`
            : placeholder}
        </p>
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
  );
}

MultipleUpload.propTypes = {
  onFileUpload: PropTypes.func,
  onFileDelete: PropTypes.func,
  placeholder: PropTypes.string,
  url: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
  ),
  isEditMode: PropTypes.bool,
  maxPhotos: PropTypes.number,
};
