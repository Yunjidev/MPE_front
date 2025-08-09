/* eslint-disable react/prop-types */
import {
  IoLocationOutline,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoBusinessOutline,
} from "react-icons/io5";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import StarRating from "./StarRatings";
import LikeButton from "../CardsEntreprises/LikesForCards/LikeButton";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const EnterpriseDetails = ({ enterprise }) => {
  const { user } = useContext(UserContext);

  const avg = Number.isFinite(enterprise?.averageRating)
    ? enterprise.averageRating
    : 0;

  return (
<section className="lg:w-1/2 bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4 shadow-lg shadow-black/30 backdrop-blur relative overflow-hidden">
      <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-violet-400/10" />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col md:flex-row gap-6 text-white">

          {/* Colonne gauche */}
          <div className="flex flex-col items-center gap-3 min-w-[10rem]">
            {enterprise.logo ? (
              <img
                src={enterprise.logo}
                alt={`${enterprise.name} - logo`}
                className="w-24 h-24 rounded-full object-cover border border-neutral-700"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/96x96.png?text=Logo";
                }}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">Logo</span>
              </div>
            )}

            {/* Métier centré */}
            <p className="text-sm text-center px-2 py-1 rounded-md border border-neutral-700 bg-neutral-900/80">
              {enterprise?.job?.name || "Métier non spécifié"}
            </p>

            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avg)} />
              <span className="text-sm font-semibold text-neutral-200">
                {avg ? avg.toFixed(1) : "—"}
              </span>
            </div>
          </div>

          {/* Colonne centrale : infos + description */}
          <div className="flex flex-col flex-1 gap-6">
            
            {/* Ligne nom + like */}
            <div className="flex items-center justify-between">
              <h1 className="truncate text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-300 to-orange-600 text-transparent bg-clip-text">
                {enterprise.name}
              </h1>
              <LikeButton userId={user?.id} enterpriseId={enterprise.id} />
            </div>

            {/* Infos entreprise */}
            <ul className="space-y-2 text-neutral-200">
              <li className="flex items-start gap-2">
                <IoLocationOutline className="mt-0.5 text-neutral-400 shrink-0" />
                <span>
                  {enterprise.adress}
                  {enterprise.city ? `, ${enterprise.city}` : ""}
                  {enterprise.zip_code ? ` (${enterprise.zip_code})` : ""}
                </span>
              </li>

              {enterprise.siret_number && (
                <li className="flex items-start gap-2">
                  <IoBusinessOutline className="mt-0.5 text-neutral-400 shrink-0" />
                  <span>{enterprise.siret_number}</span>
                </li>
              )}

              {enterprise.mail && (
                <li className="flex items-start gap-2">
                  <IoMailOutline className="mt-0.5 text-neutral-400 shrink-0" />
                  <a
                    href={`mailto:${enterprise.mail}`}
                    className="text-neutral-100 hover:text-orange-300 transition-colors"
                  >
                    {enterprise.mail}
                  </a>
                </li>
              )}

              {enterprise.phone && (
                <li className="flex items-start gap-2">
                  <IoPhonePortraitOutline className="mt-0.5 text-neutral-400 shrink-0" />
                  <span>{enterprise.phone}</span>
                </li>
              )}
            </ul>

            {/* Description intégrée */}
            {enterprise.description && (
              <div
                className="mt-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 shadow-inner shadow-black/20 text-sm text-neutral-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: enterprise.description }}
              />
            )}
          </div>

          {/* Colonne icônes droite */}
          <div className="flex flex-col items-center justify-center gap-4">
          {enterprise.instagram && (
            <a
              href={enterprise.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg border border-neutral-700 bg-neutral-900/60 flex items-center justify-center text-xl text-neutral-200 hover:text-orange-300 hover:border-orange-400/60 transition-colors"
            >
              <FaInstagram />
            </a>
          )}
          {enterprise.twitter && (
            <a
              href={enterprise.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg border border-neutral-700 bg-neutral-900/60 flex items-center justify-center text-xl text-neutral-200 hover:text-orange-300 hover:border-orange-400/60 transition-colors"
            >
              <FaXTwitter />
            </a>
          )}
          {enterprise.facebook && (
            <a
              href={enterprise.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg border border-neutral-700 bg-neutral-900/60 flex items-center justify-center text-xl text-neutral-200 hover:text-orange-300 hover:border-orange-400/60 transition-colors"
            >
              <FaFacebookF />
            </a>
          )}
          {enterprise.website && (
            <a
              href={enterprise.website}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg border border-neutral-700 bg-neutral-900/60 flex items-center justify-center text-xl text-neutral-200 hover:text-orange-300 hover:border-orange-400/60 transition-colors"
              title="Visiter le site"
            >
              <FaGlobe />
            </a>
          )}
        </div>

        </div>
      </div>
    </section>
  );
};

export default EnterpriseDetails;
