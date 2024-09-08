/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const DropdownMenu = ({ category, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-4">
      <div
        className="flex justify-between items-center bg-transparent bg-orange-100/25 py-3 px-6 rounded cursor-pointer border border-transparent hover:border-violet-400 hover:border-violet-400/25 rounded-xl shadow-md shadow-violet-400/50 "
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="dropdown-menu-content"
        role="button"
        tabIndex="0"
        aria-label={`Toggle ${category} dropdown`}
      >
        <h2 className="text-2xl font-semibold text-gray-100">{category}</h2>
        <button
          aria-label="Toggle dropdown"
          className="p-2"
          onClick={handleToggle}
        >
          <IoIosArrowDown className={`w-6 h-6 bg-none text-violet-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isOpen && (
        <div id="dropdown-menu-content" className="mt-2 space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-black-900 py-2 px-4 rounded-xl shadow-sm shadow-violet-400/25"
            >
              <h3 className="font-bold text-gray-100">{item.question}</h3>
              <p className="text-gray-300">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
