/* eslint-disable react/prop-types */
import { LiaComment } from "react-icons/lia";

export default function Comments({ totalComments }) {
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
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-emerald-400/10 blur-2xl" />
      </div>

      <div className="h-12 w-12 rounded-xl grid place-items-center ring-1 ring-emerald-400/30 bg-emerald-400/10 text-emerald-300">
        <LiaComment className="text-3xl" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-neutral-400">Commentaires</div>
        <div className="mt-1">
          <span className="text-2xl font-semibold bg-gradient-to-r from-white to-emerald-300 text-transparent bg-clip-text">
            {totalComments ?? 0}
          </span>
        </div>
        <div className="text-[11px] text-neutral-500 mt-1">Total des avis reçus</div>
      </div>
    </div>
  );
}
