/* eslint-disable react/prop-types */
import indexcards from '../../../public/assets/img/indexcards.jpg';
import { FaCalendarDay, FaWrench, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikesForCards/LikeButton';

const IndexCardsEntreprises = ({ entreprise, userId }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    city,
    zip_code,
    job,
    nextAvailableDate,
    logo,
    averageRating,
    isPremium, // si dispo côté API; sinon sera ignoré
  } = entreprise;

  const jobName = job?.name || 'Métier non spécifié';
  const nextDateDisplay = nextAvailableDate
    ? `${nextAvailableDate.date} · ${nextAvailableDate.startHour}–${nextAvailableDate.endHour}`
    : 'Non disponible';

  const goTo = () => navigate(`/enterprise/${id}`);

  return (
    <div
      onClick={goTo}
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                 border border-neutral-800 bg-neutral-900/70
                 hover:border-emerald-400/40 transition-all duration-300
                 shadow-lg hover:shadow-emerald-500/10"
    >
      {/* Gradient ring on hover */}
      <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-transparent group-hover:to-emerald-400/10 transition-colors"></div>

      {/* Like button (ne pas propager le clic) */}
      <div
        className="absolute top-3 right-3 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <LikeButton userId={userId} enterpriseId={id} />
      </div>

      {/* Badges en overlay */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        {isPremium && (
          <span className="px-2 py-1 rounded-md text-xs font-semibold
                           bg-amber-500/20 text-amber-300 border border-amber-400/30">
            Premium
          </span>
        )}
        {typeof averageRating === 'number' && (
          <span className="px-2 py-1 rounded-md text-xs font-semibold
                           bg-neutral-800/80 text-yellow-300 border border-yellow-400/30
                           flex items-center gap-1">
            <FaStar className="inline-block" />
            {averageRating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] w-full">
        <img
          src={logo || indexcards}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => { e.currentTarget.src = indexcards; }}
        />
        {/* Overlay gradient for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-900/10 to-transparent"></div>
      </div>

      {/* Body */}
      <div className="relative z-10 p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-white leading-tight line-clamp-2 group-hover:text-emerald-300 transition-colors">
          {name}
        </h2>

        {/* Job pill */}
        <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md text-xs
                        bg-neutral-800 text-neutral-200 border border-neutral-700">
          <FaWrench className="mr-1" />
          {jobName}
        </div>

        {/* Meta */}
        <div className="mt-3 space-y-2 text-sm text-neutral-300">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-0.5 shrink-0 text-neutral-400" />
            <span className="truncate">{city ? `${city}, ${zip_code}` : 'Localisation indisponible'}</span>
          </div>
          <div className="flex items-start gap-2">
            <FaCalendarDay className="mt-0.5 shrink-0 text-neutral-400" />
            <span className="truncate">Prochaine disponibilité : {nextDateDisplay}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            ID: {id}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(); }}
            className="h-9 px-3 rounded-lg border border-neutral-600 text-neutral-200
                       hover:border-emerald-400/60 hover:text-emerald-300
                       transition-colors"
            aria-label="Voir la fiche"
          >
            Voir la fiche
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexCardsEntreprises;
