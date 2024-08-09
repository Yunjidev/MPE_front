import React from 'react';

const LikesManagement = () => {
  return (
      <div className="flex flex-col space-around w-1/2 bg-neutral-800 p-6 rounded-lg mx-2">
          <h3 className="text-lg font-medium mb-4">Mes entreprises favorites</h3>
          <hr className="w-full"></hr>
          <ul>
            <li className="flex justify-between items-center bg-neutral-800 p-2 rounded-lg">
              <span>❤️ Coiffeuse du 34</span>
              <button className="bg-white text-black px-3 rounded-lg hover:bg-gray-300">Voir fiche</button>
            </li>
            <li className="flex justify-between items-center bg-neutral-800 p-2 rounded-lg">
              <span>❤️ Plomberie Gégé</span>
              <button className="bg-white text-black px-3 rounded-lg hover:bg-gray-300">Voir fiche</button>
            </li>
            <li className="flex justify-between items-center bg-neutral-800 p-2 rounded-lg">
              <span>❤️ Maçonnerie</span>
              <button className="bg-white text-black px-3 rounded-lg hover:bg-gray-300">Voir fiche</button>
            </li>
          </ul>
        </div>
  );
};

export default LikesManagement;