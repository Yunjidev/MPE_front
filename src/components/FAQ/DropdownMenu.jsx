import React, { useState } from 'react';

const DropdownMenu = ({ category, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-4">
      <div
        className="flex justify-between items-center bg-black-900 dark:bg-black-900 py-3 px-6 rounded cursor-pointer border border-transparent hover:border-orange-400 rounded shadow-sm shadow-orange-400"
        onClick={handleToggle}
      >
        <h2 className="text-2xl font-semibold text-gray-100 dark:text-gray-100">{category}</h2>
        <button className="bg-orange-400 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M4.5 10.5a.5.5 0 0 1 .707 0l3-3a.5.5 0 0 1 .707.707L5.707 10H10.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 1 0v4.293l2.646-2.647z"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-black-900 dark:bg-black-900 py-2 px-4 rounded shadow-sm shadow-orange-400"
            >
              <h3 className="font-bold text-gray-100 dark:text-gray-100">{item.question}</h3>
              <p className="text-gray-300 dark:text-gray-300">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

