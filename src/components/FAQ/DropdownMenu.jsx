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
      <div className="flex justify-between items-center bg-black-900 bg-black-900 py-3 px-6 rounded cursor-pointer border border-transparent hover:dark:border-orange-400 hover:border-violet-400 rounded shadow-sm dark:shadow-orange-400 shadow-violet-400" onClick={handleToggle}>
        <h2 className="text-2xl font-semibold text-black dark:text-gray-100">{category}</h2>
        <button className=" p-2">
        <IoIosArrowDown className={`w-6 h-6 bg-none text-violet-600 dark:text-orange-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-black-900 dark:bg-black-900 py-2 px-4 rounded shadow-sm shadow-violet-400 dark:shadow-orange-400"
            >
              <h3 className="font-bold text-black dark:text-gray-100">{item.question}</h3>
              <p className="text-black dark:text-gray-300">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;