/* eslint-disable react/prop-types */
// src/components/PhotoGallery.js

const PhotoGallery = ({ photos, openPopup }) => {
  return (
    <div className="w-full h-[500px] flex flex-col gap-4 mr-9">
      {photos && photos.length > 0 ? (
        <>
          <div className="w-full h-2/3 bg-transparent rounded-md flex items-center justify-center overflow-hidden">
            <img
              src={photos[0]}
              alt="Photo principale"
              className="max-h-full max-w-full object-contain cursor-pointer"
              onClick={() => openPopup(photos[0])}
            />
          </div>
          <div className="flex gap-4 h-1/3">
            {photos[1] && (
              <div className="w-1/2 h-full bg-transparent rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src={photos[1]}
                  alt="Photo secondaire 1"
                  className="max-h-full max-w-full object-contain cursor-pointer"
                  onClick={() => openPopup(photos[1])}
                />
              </div>
            )}
            {photos[2] && (
              <div className="w-1/2 h-full bg-transparent rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src={photos[2]}
                  alt="Photo secondaire 2"
                  className="max-h-full max-w-full object-contain cursor-pointer"
                  onClick={() => openPopup(photos[2])}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="h-full bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Aucune photo disponible</span>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
