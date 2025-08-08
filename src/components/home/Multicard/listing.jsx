
const requirements = [
  { text: 'Nouvelle clientèle', fulfilled: true },
  { text: 'Visilibitée accrue', fulfilled: true },
  { text: 'Gestion de votre entreprise', fulfilled: true },
  { text: 'Page de présentation individuelle entreprise', fulfilled: true },
  { text: 'Listing de vos services', fulfilled: true },
  { text: 'Commentaires et notes par services', fulfilled: true },
  { text: 'Divers services Premium', fulfilled: true }

];

const Listing = () => {
  return (
    <div className="p-6">
      <ul className="max-w-lg space-y-2 list-inside text-white">
        {requirements.map((item, index) => (
          <li key={index} className="flex items-center text-lg">
            <svg
              className={`w-4 h-4 me-3 flex-shrink-0 ${item.fulfilled ? 'text-green-400' : 'text-gray-400'}`} // Augmente la taille du SVG
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listing;
