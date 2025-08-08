/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import EditEnterprise from "../EditEnterprise";

export default function EditEnterpriseModal({ enterpriseId, onSave, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="p-2 rounded-lg shadow-lg relative max-w-4xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <FaTimes
          className="absolute top-6 right-6 z-50 text-[#67FFCC] cursor-pointer text-2xl"
          title="Fermer"
          onClick={onClose}
        />
        <EditEnterprise
          enterpriseId={enterpriseId}
          onSave={onSave}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
