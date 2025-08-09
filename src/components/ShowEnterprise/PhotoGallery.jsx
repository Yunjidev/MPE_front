/* eslint-disable react/prop-types */
const PhotoGallery = ({ photos, openPopup }) => {
  return (
    <div className="w-full lg:w-1/2 h-[450px] flex flex-col gap-4">
      {photos?.length > 0 ? (
        <>
          <div className="flex-1 rounded-lg overflow-hidden cursor-pointer" onClick={() => openPopup(photos[0])}>
            <img src={photos[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </div>
          <div className="grid grid-cols-2 gap-4 flex-none h-1/3">
            {photos.slice(1, 3).map((p, i) => (
              <div key={i} className="rounded-lg overflow-hidden cursor-pointer" onClick={() => openPopup(p)}>
                <img src={p} alt={`Secondary ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-full bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
          Aucune photo disponible
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
