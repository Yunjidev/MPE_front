/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import OffersList from "@/components/DashboardEnterprise/OffersList";

export default function OffersListModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-800 p-6 w-11/12 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <FaTimes
          className="absolute top-3 right-3 text-[#67FFCC] cursor-pointer text-2xl z-50"
          title="Fermer"
          onClick={onClose}
        />
        <OffersList />
      </div>
    </div>
  );
}
