import { useEffect, useState } from "react";
import { getData } from "../../services/data-fetch";  // Importation de getData
import { cn } from "../../@/lib/utils";
import Marquee from "../../@/components/magicui/marquee";
import './spot.css';

// Composant ReviewCard inchangé
const ReviewCard = ({ img, name, username, body }) => {
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
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  const [reviews, setReviews] = useState([]);

  // Utilisation de useEffect pour fetcher les données de l'API
  useEffect(() => {
    const fetchPremiumEnterprises = async () => {
      try {
        const data = await getData('enterprises/premium');  // Utilisation de getData
        const formattedData = data.map((enterprise) => ({
          name: enterprise.name,
          username: enterprise.country.name,
          body: enterprise.job.name,
          img: enterprise.logo || enterprise.entrepreneur.avatar, // Choix de l'image appropriée
        }));
        setReviews(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchPremiumEnterprises();
  }, []);

  // Division des reviews en deux pour l'effet Marquee
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
