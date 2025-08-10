/* eslint-disable react/prop-types */
import AverageRating from "./AverageRating";
import Comments from "./Comments";
import TotalReservations from "./TotalReservations";
import OffersCount from "./OffersCount";
import UpcomingWeek from "./UpcomingWeek";
import GraphForView from "./GraphForView";
import CommentsList from "./CommentsList";
import Likes from "./Likes";

// ⛔️ SUPPRIMER cet import si tu n’en as plus besoin
// import { useEnterpriseData } from "./useEnterpriseData";

// utilitaires
function getArray(obj, ...keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}
function getNumber(obj, ...keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && !Number.isNaN(Number(v))) {
      return Number(v);
    }
  }
  return 0;
}

function computeMetrics(enterprise) {
  const offers = getArray(enterprise, "offers", "services", "products");

  const totalReservations = offers.reduce((acc, o) => {
    const res = getArray(o, "reservations", "bookings", "appointments");
    return acc + res.length;
  }, 0);

  const totalComments = offers.reduce((acc, o) => {
    const ratings = getArray(o, "ratings", "notes", "reviews", "comments");
    return acc + ratings.length;
  }, 0);

  const averageRating = getNumber(
    enterprise,
    "averageRating",
    "average_note",
    "avgRating"
  );

  const offersCount = offers.length;

  const now = new Date();
  const in7 = new Date(now);
  in7.setDate(now.getDate() + 7);

  const upcoming7 = offers.reduce((acc, o) => {
    const res = getArray(o, "reservations", "bookings", "appointments");
    const cnt = res.filter((r) => {
      const d = r?.date ? new Date(r.date) : null;
      return d && d >= now && d <= in7;
    }).length;
    return acc + cnt;
  }, 0);

  return { totalReservations, totalComments, averageRating, offersCount, upcoming7 };
}

export default function StatsSummary({ enterprise }) {
  // ❗️N’UTILISE PLUS useEnterpriseData ici.
  // On se base sur l’entreprise reçue depuis StatsEnterprises.

  if (!enterprise) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 text-neutral-300">
        Chargement des statistiques…
      </div>
    );
  }

  const {
    totalReservations,
    totalComments,
    averageRating,
    offersCount,
    upcoming7,
  } = computeMetrics(enterprise);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold text-lg">Statistiques</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <OffersCount count={offersCount} />
            <TotalReservations count={totalReservations} />
            <AverageRating averageRating={averageRating} />
            <Comments totalComments={totalComments} />
            <UpcomingWeek count={upcoming7} />
            {/* 👉 on passe l’ID de l’entreprise cliquée */}
            <Likes enterpriseId={enterprise.id} />
          </div>

          <div className="flex-1 min-w-[280px]">
            <div className="rounded-xl bg-neutral-900 ring-1 ring-neutral-800 h-full p-4">
              <GraphForView />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-6">
        <CommentsList enterprise={enterprise} />
      </div>
    </>
  );
}
