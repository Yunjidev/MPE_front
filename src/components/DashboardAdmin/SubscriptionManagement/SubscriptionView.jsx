import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import Button from "../../Button/button";
import { useNavigate } from "react-router-dom";
import { getSubscription, deleteSubscription, updateSubscription } from "./FunctionForSubscription";
import { toast } from "react-toastify";

const SubscriptionView = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionsData = async () => {
      try {
        const subscriptionsData = await getSubscription();
        setSubscriptions(subscriptionsData);
      } catch (error) {
        console.error("Failed to fetch subscriptions", { error });
      }
    };

    fetchSubscriptionsData();
  }, []);

  const handleDeleteSubscription = (id) => {
      
    deleteSubscription(id)
      .then(() => {
        toast.success("La souscription a été supprimée avec succès");
        setSubscriptions(subscriptions.filter(sub => sub.id !== id));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la souscription:", error);
        toast.error("Une erreur est survenue lors de la suppression de la souscription");
      });
  };
  // Fetch update type d'abonnement
  const handleUpdateSubscription = (id, data) => {
    updateSubscription(id, data)
      .then(() => {
        toast.success("La souscription a été modifiée avec succès");
        setSubscriptions(subscriptions.map(sub => sub.id === id ? { ...sub, ...data } : sub));
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de la souscription:", error);
        toast.error("Une erreur est survenue lors de la modification de la souscription");
      });
  };

  const handleSubscriptionTypeChange = (event) => {
    setSelectedSubscriptionType(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Pagination
  const pageCount = Math.ceil(subscriptions.length / pageSize);
  const paginatedSubscriptions = subscriptions.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  const viewEnterprise = (id) => {
    navigate(`/enterprise/${id}`);
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPageIndex(0); // Reset to page 0
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-800 border border-neutral-700 w-1/2 mx-auto">
      <div className="flex flex-col">
        {paginatedSubscriptions.map((subscription) => (
          // console.log(subscription),
          <div
            key={subscription.enterprise.name}
            className="mb-4 p-4 rounded-lg shadow-md bg-neutral-800 flex items-start"
          >
            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-6 items-center">
                <div className="flex items-center col-span-2">
                  <img
                    src={subscription.enterprise.logo}
                    alt={`${subscription.enterprise.name} logo`}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="font-bold text-white">
                    {subscription.enterprise.name || "N/A"}
                  </div>
                </div>
                <div className="font-bold text-white">
                  Type d'abonnement:
                </div>
                <div className="text-white">
                  {subscription.subscription_type || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Statut:
                </div>
                <div className="text-white">
                  {subscription.status || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Date de début:
                </div>
                <div className="text-white">
                  {new Date(subscription.start_date).toLocaleDateString() || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Date de fin:
                </div>
                <div className="text-white">
                  {new Date(subscription.end_date).toLocaleDateString() || "N/A"}
                </div>
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <Button
                onClick={() => viewEnterprise(subscription.enterprise.name)}
                className="text-blue-500 hover:underline mb-2 min-w-max"
              >
                <FaEye />
              </Button>
              <Button
  onClick={() => {
    // console.log("ID de la souscription:", subscription.id);
    handleDeleteSubscription(subscription.id);
  }}
                className="text-red-500 hover:underline mb-2 min-w-max"
              >
                Supprimer
              </Button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateSubscription(subscription.id, {
                    subscription_type: selectedSubscriptionType,
                    status: selectedStatus,
                  });
                }}
              >
                <select
                  name="subscription_type"
                  value={selectedSubscriptionType}
                  onChange={handleSubscriptionTypeChange}
                  className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 m-2"
                >
                  <option value="forever">forever</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                </select>
                <select
                  name="status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 m-2"
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
                <Button type="submit" className="text-green-500 hover:underline min-w-max">
                  Modifier
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="px-4 py-2 mx-1 bg-neutral-700 text-white rounded-lg mr-4 transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out w-auto"
        >
          « Précédent
        </button>
        <span className="text-white text-black font-bold">
          Page {pageIndex + 1} sur {pageCount}
        </span>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          className="px-4 py-2 mx-1 bg-neutral-700 text-white rounded-lg ml-4 transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out w-auto"
        >
          Suivant »
        </button>
      </div>
    </div>
  );
};

export default SubscriptionView;
