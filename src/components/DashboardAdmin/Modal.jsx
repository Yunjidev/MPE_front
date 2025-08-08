/* eslint-disable react/prop-types */
import { MdClose } from 'react-icons/md';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative border border-gray-500 hover:border-[#67FFCC] transition duration-300 ease-in-out rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-[#67FFCC]"
        >
          <MdClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
