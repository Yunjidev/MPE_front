/* eslint-disable react/prop-types */
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import LikeButton from "../CardsEntreprises/LikesForCards/LikeButton";
import StarRating from "./StarRatings";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const EnterpriseHeader = ({ enterprise }) => {
  const { user } = useContext(UserContext);
  const avg = Number.isFinite(enterprise?.averageRating) ? enterprise.averageRating : 0;

  return (
    <header className="relative bg-neutral-900 mt-12">
      <div 
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${enterprise.photos?.[0] || "https://via.placeholder.com/1200x400"})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-6">
        <img
          src={enterprise.logo || "https://via.placeholder.com/150"}
          alt="Logo"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-300 to-orange-600 text-transparent bg-clip-text">
              {enterprise.name}
            </h1>
            <LikeButton userId={user?.id} enterpriseId={enterprise.id} />
          </div>
          <p className="text-sm text-gray-400 mt-1">{enterprise?.job?.name}</p>

          <div className="flex items-center justify-center lg:justify-start gap-2 mt-2">
            <StarRating rating={Math.round(avg)} />
            <span className="text-sm font-semibold">{avg ? avg.toFixed(1) : "—"}</span>
          </div>
        </div>

        <div className="flex gap-3">
          {enterprise.instagram && <a href={enterprise.instagram} target="_blank" rel="noreferrer" className="social-btn"><FaInstagram /></a>}
          {enterprise.twitter && <a href={enterprise.twitter} target="_blank" rel="noreferrer" className="social-btn"><FaXTwitter /></a>}
          {enterprise.facebook && <a href={enterprise.facebook} target="_blank" rel="noreferrer" className="social-btn"><FaFacebookF /></a>}
          {enterprise.website && <a href={enterprise.website} target="_blank" rel="noreferrer" className="social-btn"><FaGlobe /></a>}
        </div>
      </div>
    </header>
  );
};

export default EnterpriseHeader;
