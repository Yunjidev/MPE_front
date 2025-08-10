/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { FaEdit, FaEye, FaRegListAlt, FaClock } from "react-icons/fa";

function getTodayReservations(enterprise) {
  if (!enterprise?.offers?.length) return [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const list = [];
  for (const offer of enterprise.offers) {
    for (const r of offer.reservations || []) {
      const d = new Date(r.date);
      if (d >= today && d < tomorrow) {
        list.push({
          ...r,
          offerName: offer.name,
        });
      }
    }
  }
  // tri par heure de début
  return list.sort(
    (a, b) =>
      new Date(`${a.date}T${a.start_time}`) - new Date(`${b.date}T${b.start_time}`)
  );
}

export default function ReservationSummary({ enterprise, onEdit, onView, onOffersList }) {
  const todayReservations = getTodayReservations(enterprise);
  const currentDate = new Date().toLocaleDateString();

  const ActionButton = ({ icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 h-14 px-4 rounded-xl bg-neutral-900 text-neutral-200 ring-1 ring-neutral-800 hover:bg-neutral-800 hover:ring-neutral-700 transition active:scale-[0.98]"
      type="button"
    >
      <span className="text-emerald-300">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <FaClock className="text-neutral-400" />
          <p className="text-white font-semibold">Gestion de mon entreprise</p>
        </div>
        <span className="text-xs text-neutral-400">
          Réservations du jour — <span className="text-neutral-200">{currentDate}</span>
        </span>
      </div>

      {/* Actions + Réservations */}
      <div className="p-5 flex flex-col lg:flex-row gap-5">
        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <ActionButton
            icon={<FaEdit className="text-lg" />}
            label="Modifier l'entreprise"
            onClick={onEdit}
          />
          <ActionButton
            icon={<FaEye className="text-lg" />}
            label="Voir la page entreprise"
            onClick={onView}
          />
          <ActionButton
            icon={<FaRegListAlt className="text-lg" />}
            label="Liste des services"
            onClick={onOffersList}
          />
        </div>

        {/* Réservations du jour */}
        <div className="flex-1 rounded-xl bg-neutral-900 ring-1 ring-neutral-800 p-4 max-h-48 overflow-y-auto">
          {todayReservations.length > 0 ? (
            <div className="divide-y divide-neutral-800">
              {todayReservations.map((r, idx) => (
                <div key={`${r.offerName}-${r.start_time}-${idx}`} className="py-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                  <p className="text-white font-medium min-w-[160px]">{r.offerName}</p>
                  <p className="text-neutral-300">
                    <strong className="text-neutral-400">Début :</strong> {r.start_time}
                  </p>
                  <p className="text-neutral-300">
                    <strong className="text-neutral-400">Fin :</strong> {r.end_time}
                  </p>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-md ring-1 ${
                      r.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30"
                        : r.status === "pending"
                        ? "bg-amber-500/10 text-amber-300 ring-amber-500/30"
                        : "bg-neutral-800 text-neutral-300 ring-neutral-700"
                    }`}
                  >
                    {r.status || "inconnu"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid place-items-center h-20 text-neutral-400 text-sm">
              Aucune réservation aujourd'hui
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
