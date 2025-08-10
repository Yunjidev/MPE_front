/* eslint-disable react/prop-types */
import { FaClock } from "react-icons/fa";

export default function UpcomingWeek({ count }) {
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
        <div className="absolute -bottom-20 -left-12 w-52 h-52 rounded-full bg-sky-400/10 blur-2xl" />
      </div>

      <div className="h-12 w-12 rounded-xl grid place-items-center ring-1 ring-sky-400/30 bg-sky-400/10 text-sky-300">
        <FaClock className="text-2xl" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-neutral-400">7 prochains jours</div>
        <div className="mt-1">
          <span className="text-2xl font-semibold bg-gradient-to-r from-white to-sky-300 text-transparent bg-clip-text">
            {count ?? 0}
          </span>
        </div>
        <div className="text-[11px] text-neutral-500 mt-1">RDV planifiés sur une semaine</div>
      </div>
    </div>
  );
}
