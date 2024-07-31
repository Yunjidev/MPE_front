import { Link } from "react-router-dom";
import { useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid'


export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="navbar bg-base-100 px-2 sm:px-4 py-2.5 rounded">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <div className="form-control mr-3">
            <input type="text" placeholder="Search" className="input input-bordered" />
          </div>
          <button className="btn btn-ghost btn-circle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown dropdown-end">
              <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isDropdownOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-25" onClick={() => setIsDropdownOpen(false)}></div>
      )}
    </>
  );
}

