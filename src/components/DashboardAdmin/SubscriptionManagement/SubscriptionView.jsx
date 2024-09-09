import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import Button from "../../Button/button";
import { useNavigate } from "react-router-dom";
import { getSubscription, deleteSubscription, updateSubscription, addSubscription } from "./FunctionForSubscription";
import { toast } from "react-toastify";

const SubscriptionView = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-600 dark:bg-neutral-800 border dark:border-neutral-700">
      <div className="flex flex-col">
        {paginatedSubscriptions.map((subscription) => (
          <div
            key={subscription.enterprise.name}
            className="mb-4 p-4 rounded-lg shadow-md bg-white dark:bg-neutral-800 flex items-start"
          >
            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center">
                  <img
                    src={subscription.enterprise.logo}
                    alt={`${subscription.enterprise.name} logo`}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="font-bold text-gray-900 dark:text-white">
                    {subscription.enterprise.name || "N/A"}
                  </div>
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  Type d'abonnement:
                </div>
                <div className="text-gray-900 dark:text-white">
                  {subscription.subscription_type || "N/A"}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  Statut:
                </div>
                <div className="text-gray-900 dark:text-white">
                  {subscription.status || "N/A"}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  Date de début:
                </div>
                <div className="text-gray-900 dark:text-white">
                  {new Date(subscription.start_date).toLocaleDateString() || "N/A"}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  Date de fin:
                </div>
                <div className="text-gray-900 dark:text-white">
                  {new Date(subscription.end_date).toLocaleDateString() || "N/A"}
                </div>
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <Button
                onClick={() => viewEnterprise(subscription.enterprise.name)}
                className="text-blue-600 dark:text-blue-500 hover:underline mb-2"
              >
                <FaEye />
              </Button>
              <Button
                onClick={() => handleDeleteSubscription(subscription.id)}
                className="text-red-600 dark:text-red-500 hover:underline"
              >
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg mr-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          « Précédent
        </button>
        <span className="dark:text-white text-black font-bold">
          Page {pageIndex + 1} sur {pageCount}
        </span>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg ml-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          Suivant »
        </button>
      </div>
    </div>
  );
};

export default SubscriptionView;
