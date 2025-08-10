/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, children, maxWidth = "max-w-lg" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop (click to close) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel with a single ring (no inner border) */}
      <div className={`relative w-full ${maxWidth}`}>
        <div className="relative rounded-2xl bg-neutral-900 ring-1 ring-neutral-700 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-700/60 transition"
            aria-label="Fermer"
          >
            <MdClose size={22} />
          </button>

          {/* Content */}
          <div className="p-5 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
