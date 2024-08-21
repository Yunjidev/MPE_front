/* eslint-disable react/prop-types */
// src/components/PhotoGallery.js

const PhotoGallery = ({ photos, openPopup }) => {
  return (
    <div className="md:w-4/5 flex flex-col space-y-4 mr-6">
      {photos && photos.length > 0 ? (
        <>
          <img 
            src={photos[0]} 
            alt="Photo principale" 
            className="w-full h-auto rounded-md cursor-pointer" 
            onClick={() => openPopup(photos[0])}
          />
          <div className="flex w-full gap-4 grid-cols-2 pr-4">
            {photos[1] && (
              <img 
                src={photos[1]} 
                alt="Photo secondaire 1" 
                className="w-5/12 h-auto rounded-md cursor-pointer" 
                onClick={() => openPopup(photos[1])}
              />
            )}
            {photos[2] && (
              <img 
                src={photos[2]} 
                alt="Photo secondaire 2" 
                className="w-7/12 h-auto rounded-md cursor-pointer" 
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
