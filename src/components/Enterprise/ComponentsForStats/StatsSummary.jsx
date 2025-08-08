import Likes from "./Likes";
import LenghtSearch from "./LenghtSearch";
import LenghtView from "./LenghtView";
import LengthReservation from "./LengthReservation";
import AverageRating from "./AverageRating";
import Comments from "./Comments";
import GraphForView from "./GraphForView";
import CommentsList from "./CommentsList";

export default function StatsSummary() {
  return (
    <>
    <div className="bg-neutral-800 p-4 rounded-lg mb-8 text-neutral-300">
    <p className="text-xl">Statistiques</p>
    <hr/>
      <div className="flex flex-row justify-around mb-8 bg-neutral-800 rounded-lg p-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
          <Likes />
          <LenghtSearch />
          <LenghtView />
          <LengthReservation />
          <AverageRating />
          <Comments />
        </div>
        <div className="w-1/2 h-full">
          <GraphForView />
        </div>
      </div>

      </div>
      <div className="w-full mt-8">
        <CommentsList />
      </div>
    </>
  );
}
