import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export default function SingleUpload({
  onFileUpload,
  onFileDelete,
  placeholder,
  url = "",
  isEditMode,
  className,
}) {
  const [logoUrl, setLogoUrl] = useState();
  const memoizedUrl = useMemo(() => {
    if (typeof url === "string") {
      return url;
    } else if (url instanceof File) {
      return URL.createObjectURL(url);
    }
    return "";
  }, [url]);

  useEffect(() => {
    if (isEditMode && memoizedUrl !== logoUrl) {
      setLogoUrl(memoizedUrl);
    }
  }, [memoizedUrl, logoUrl, isEditMode]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setLogoUrl(URL.createObjectURL(file));
    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleDelete = () => {
    setLogoUrl(null);
    if (onFileDelete) {
      onFileDelete();
    }
  };

  return (
    <div className={`${className} flex justify-center items-center`}>
      <label
        htmlFor="single-upload"
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
            <p className="mt-2 text-center text-sm">{placeholder}</p>
          </>
        )}
      </label>
      <input
        id="single-upload"
        type="file"
        onChange={handleUpload}
        className="hidden"
      />
      {logoUrl && (
        <button
          className="absolute top-32 left-64 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          X
        </button>
      )}
    </div>
  );
}

SingleUpload.propTypes = {
  onFileUpload: PropTypes.func,
  onFileDelete: PropTypes.func,
  placeholder: PropTypes.string,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
  isEditMode: PropTypes.bool,
  className: PropTypes.string,
};
