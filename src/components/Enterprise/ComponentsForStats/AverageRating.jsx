/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

export default function AverageRating({ averageRating }) {
  const value = Number(averageRating || 0).toFixed(1);
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl border border-neutral-800
        bg-neutral-900/80 backdrop-blur-sm
        shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]
        p-5 min-w-[14rem] h-32 flex items-center gap-4
      "
    >
      {/* Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-amber-400/10 blur-2xl" />
      </div>

      {/* Icône */}
      <div className="h-12 w-12 rounded-xl grid place-items-center ring-1 ring-amber-400/30 bg-amber-400/10 text-amber-300">
        <FaStar className="text-2xl" aria-hidden="true" />
      </div>

      {/* Contenu */}
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-neutral-400">Note globale</div>
        <div className="mt-1">
          <span className="text-2xl font-semibold bg-gradient-to-r from-white to-amber-300 text-transparent bg-clip-text">
            {value}
          </span>
          <span className="ml-1 text-neutral-400">/5</span>
        </div>
        <div className="text-[11px] text-neutral-500 mt-1">Moyenne des avis</div>
      </div>
    </div>
  );
}
