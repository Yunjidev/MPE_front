import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export default function SingleUpload({
  onFileUpload,
  onFileDelete,
  placeholder,
  url = "",
  isEditMode,
  className = "",
}) {
  const [logoUrl, setLogoUrl] = useState();

  const memoizedUrl = useMemo(() => {
    if (typeof url === "string") return url;
    if (url instanceof File) return URL.createObjectURL(url);
    return "";
  }, [url]);

  useEffect(() => {
    if (isEditMode && memoizedUrl !== logoUrl) setLogoUrl(memoizedUrl);
  }, [memoizedUrl, logoUrl, isEditMode]);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setLogoUrl(nextUrl);
    onFileUpload?.(file);
  };

  const handleDelete = () => {
    setLogoUrl(null);
    onFileDelete?.();
  };

  return (
    <div className={`${className} relative flex items-center justify-center py-2`}>
      <label
        htmlFor="single-upload"
        className="
          h-40 w-40 rounded-full overflow-hidden
          grid place-items-center cursor-pointer
          bg-neutral-900/70
          ring-1 ring-neutral-800 hover:ring-neutral-700
          transition
        "
        title={logoUrl ? "Changer l’avatar" : "Choisir un avatar"}
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <span className="text-neutral-500 text-sm text-center px-4 leading-relaxed">
            {placeholder || "Sélectionnez un avatar"}
          </span>
        )}
      </label>

      <input id="single-upload" type="file" onChange={handleUpload} className="hidden" />

      {logoUrl && (
        <button
          type="button"
          onClick={handleDelete}
          className="
            absolute right-2 top-2
            h-8 w-8 rounded-full
            bg-neutral-800 text-neutral-200
            ring-1 ring-neutral-700 hover:bg-neutral-700
            flex items-center justify-center
            transition
          "
          aria-label="Supprimer l’avatar"
          title="Supprimer l’avatar"
        >
          ×
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
