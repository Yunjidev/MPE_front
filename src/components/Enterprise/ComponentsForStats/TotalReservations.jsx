/* eslint-disable react/prop-types */
import { FaCalendarCheck } from "react-icons/fa";

export default function TotalReservations({ count }) {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl border border-neutral-800
        bg-neutral-900/80 backdrop-blur-sm
        shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]
        p-5 min-w-[14rem] h-32 flex items-center gap-4
      "
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-orange-400/10 blur-2xl" />
      </div>

      <div className="h-12 w-12 rounded-xl grid place-items-center ring-1 ring-orange-400/30 bg-orange-400/10 text-orange-300">
        <FaCalendarCheck className="text-2xl" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-neutral-400">Total réservations</div>
        <div className="mt-1">
          <span className="text-2xl font-semibold bg-gradient-to-r from-orange-200 to-orange-400 text-transparent bg-clip-text">
            {count ?? 0}
          </span>
        </div>
        <div className="text-[11px] text-neutral-500 mt-1">Depuis l’ouverture des services</div>
      </div>
    </div>
  );
}
