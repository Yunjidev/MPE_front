/* eslint-disable react/prop-types */
import {
  IoLocationOutline,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoBusinessOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import StarRating from "./StarRatings";
import LikeButton from "../CardsEntreprises/LikesForCards/LikeButton";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const EnterpriseDetails = ({ enterprise }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full flex flex-col justify-between p-3 rounded-lg bg-neutral-800 border border-neutral-700 mt-12 mb-6">
      <div className="flex items-start text-white">
        <div className="flex flex-col items-center mr-6">
          {enterprise.logo ? (
            <img
              src={enterprise.logo}
              alt="Logo"
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-400">Logo</span>
            </div>
          )}
          <p className="font-semibold text-lg text-center mt-2">
            {enterprise.job.name}
          </p>

          <div className="flex items-center mt-2">
            <StarRating rating={Math.round(enterprise.averageRating)} />
            <p className="ml-2 text-lg font-semibold">
              {enterprise.averageRating.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between flex-grow">
          <div className="flex flex-col mb-4">
            <p className="flex items-center space-x-2 mb-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-200 to-emerald-500 text-transparent bg-clip-text">
                {enterprise.name}
              </span>
              <LikeButton userId={user.id} enterpriseId={enterprise.id} />
            </p>
            <p className="flex items-center space-x-2 mb-2">
              <IoLocationOutline className="text-xl" />
              <span>
                {enterprise.adress}, {enterprise.city}
              </span>
            </p>
            <p className="flex items-center space-x-2 mb-2">
              <IoBusinessOutline className="text-xl" />
              <span>{enterprise.siret_number}</span>
            </p>
            <p className="flex items-center space-x-2 mb-2">
              <IoMailOutline className="text-xl" />
              <a
                href={`mailto:${enterprise.mail}`}
                className="text-white hover:text-emerald-300 transition-colors duration-300"
              >
                {enterprise.mail}
              </a>
            </p>
            <p className="flex items-center space-x-2 mb-2">
              <IoPhonePortraitOutline className="text-xl" />
              <span>{enterprise.phone}</span>
            </p>
            <p className="flex items-center space-x-2 mb-2">
              <IoGlobeOutline className="text-xl" />
              <a
                href={enterprise.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-300 transition-colors duration-300"
              >
                {enterprise.website}
              </a>
            </p>
          </div>

          <div className="flex flex-col space-y-4 mt-12 ml-9">
            {enterprise.instagram && (
              <a
                href={enterprise.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-white hover:text-emerald-300 transition-colors duration-300"
                title="Instagram link"
              >
                <FaInstagram />
              </a>
            )}
            {enterprise.twitter && (
              <a
                href={enterprise.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-white hover:text-emerald-300 transition-colors duration-300"
                title="Twitter link"
              >
                <FaXTwitter />
              </a>
            )}
            {enterprise.facebook && (
              <a
                href={enterprise.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-white hover:text-emerald-300 transition-colors duration-300"
                title="Facebook link"
              >
                <FaFacebookF />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDetails;
