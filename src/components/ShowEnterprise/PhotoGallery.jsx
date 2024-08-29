/* eslint-disable react/prop-types */
// src/components/PhotoGallery.js

const PhotoGallery = ({ photos, openPopup }) => {
  return (
    <div className="md:w-4/5 h-screen flex flex-col space-y-4 lg:mr-6">
      {photos && photos.length > 0 ? (
        <>
          <img
            src={photos[0]}
            alt="Photo principale"
            className="w-full h-3/6 object-cover rounded-md cursor-pointer"
            onClick={() => openPopup(photos[0])}
          />
          <div className="flex w-full h-2/6 gap-4 grid-cols-2">
            {photos[1] && (
              <img
                src={photos[1]}
                alt="Photo secondaire 1"
                className="w-5/12  object-cover rounded-md cursor-pointer"
                onClick={() => openPopup(photos[1])}
              />
            )}
            {photos[2] && (
              <img
                src={photos[2]}
                alt="Photo secondaire 2"
                className="w-7/12  object-cover rounded-md cursor-pointer"
                onClick={() => openPopup(photos[2])}
              />
            )}
          </div>
        </>
      ) : (
        <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Aucune photo disponible</span>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
