import Likes from "../../components/Enterprise/ComponentsForStats/Likes";
import LenghtSearch from "../../components/Enterprise/ComponentsForStats/LenghtSearch";
import LenghtView from "../../components/Enterprise/ComponentsForStats/LenghtView";
import LengthReservation from "../../components/Enterprise/ComponentsForStats/LengthReservation";
import AverageRating from "../../components/Enterprise/ComponentsForStats/AverageRating";
import Comments from "../../components/Enterprise/ComponentsForStats/Comments";
import GraphForView from "../../components/Enterprise/ComponentsForStats/GraphForView";
import CommentsList from "../../components/Enterprise/ComponentsForStats/CommentsList";


export default function StatsEnterprises() {
  return (
    <div className="flex flex-col items-center justify-center p-4 lg:p-8 mx-4 lg:mx-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-[#67FFCC] dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] text-transparent bg-clip-text">
        Vos Statistiques
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Likes />
        <LenghtSearch />
        <LenghtView />
        <LengthReservation />
        <AverageRating />
        <Comments />
      </div>
      <div className="w-full mt-8">
        <GraphForView />
      </div>
      <div className="w-full mt-8">
        <CommentsList />
      </div>
    </div>
  );
}