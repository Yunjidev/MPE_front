/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getData } from "../../services/data-fetch";
import { cn } from "../../@/lib/utils";
import Marquee from "../../@/components/magicui/marquee";
import StarRating from "../../components/ShowEnterprise/StarRatings"; // Importation du système d'étoiles
import { FaMapMarkerAlt } from "react-icons/fa"; // Importation des icônes
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import './spot.css';

const ReviewCard = ({ img, name, username, body, city, zip_code, rating }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <div className="flex items-center">
            <StarRating rating={Math.round(rating)} /> {/* Étoiles */}
            <p className="ml-2 text-lg font-semibold text-white">{rating.toFixed(1)}</p> {/* Note moyenne */}
          </div>
        </div>
      </div>

      <blockquote className="mt-2 text-sm text-white flex items-center gap-1">
        <MdOutlineWork className="text-white/60" /> {/* Icône pour username */}
        {username}
      </blockquote>

      <blockquote className="mt-2 text-sm text-white flex items-center gap-1">
        <FaMapLocationDot className="text-white/60" /> {/* Icône pour body */}
        {body}
      </blockquote>

      <blockquote className="mt-2 text-sm text-white flex items-center gap-1">
        <FaMapMarkerAlt className="text-white/60" /> {/* Icône pour zip_code et city */}
        {zip_code} {city}
      </blockquote>
    </figure>
  );
};


export function MarqueeDemo() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchPremiumEnterprises = async () => {
      try {
        const data = await getData('enterprises/premium');
        const formattedData = data.map((enterprise) => ({
          name: enterprise.name,
          username: enterprise.job.name,
          body: enterprise.country.name,
          city: enterprise.city,
          zip_code: enterprise.zip_code,
          rating: enterprise.averageRating,
          img: enterprise.logo || enterprise.entrepreneur.avatar,
        }));
        setReviews(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchPremiumEnterprises();
  }, []);

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">Découvrez </p>
        <p className="text-4xl font-bold bg-gradient-to-r from-orange-200 to-orange-400 text-transparent bg-clip-text">Nos entreprises Premium</p>
      </div>
      <div className="relative top-10 lg:top-16 flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-neutral-800 "></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-neutral-800"></div>
      </div>
    </>
  );
}
