import React from 'react';
import { PiUserRectangle } from "react-icons/pi";
import { MdOutlinePictureInPicture, MdAlternateEmail, MdPhoneCallback, MdHome } from "react-icons/md";


const ProfileManagement = () => {
  return (
      <div className="bg-neutral-800 p-6 rounded-lg w-1/2 mx-auto">
        {/* Profile Information */}
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <PiUserRectangle size={256} />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-center">Nom Prénom</h3>
          </div>
        </div>
        <div className="flex flex-row mt-4">
          <ul className="space-y-4">
            <li className="flex items-center"><MdHome className="mr-2" />Adresse</li>
            <li className="flex items-center"><MdPhoneCallback className="mr-2" />Numéro de téléphone</li>
            <li className="flex items-center"><MdAlternateEmail className="mr-2" />E-mail</li>
            <li className="flex items-center"><MdOutlinePictureInPicture className="mr-2" />Photo de profil</li>
          </ul>
        </div>
      </div>
  );
};

export default ProfileManagement;
