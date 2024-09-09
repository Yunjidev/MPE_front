import { useState, useEffect } from "react";
import "./test.css";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { enterprisesAtom } from "../../store/enterprises";
import EnterpriseSideBar from "./EnterpriseSideBar";
import UserSideBar from "./UserSideBar";
import AdminSideBar from "./AdminSideBar";
import HamburgerIcon from "../Utils/Svg/HamburgerIcon";

const iconstyle = "w-5 h-5 fill-current text-white";
const linkstyle = "space-x-3 p-2 hover:bg-gray-700 ";
const userColorStyle =
  "bg-gradient-to-r from-violet-200 to-violet-400 text-transparent bg-clip-text";
const enterpriseColorStyle =
  "bg-gradient-to-r from-orange-200 to-orange-400 text-transparent bg-clip-text";
const adminColorStyle =
  "bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useAtom(userAtom);
  const [enterprises] = useAtom(enterprisesAtom);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest("aside") === null && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, enterprises]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        className="fixed top-24 left-6 lg:hidden inline-flex items-center p-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600"
        onClick={toggleSidebar}
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
      >
        <span className="sr-only">Open sidebar</span>
        <HamburgerIcon />
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`sticky top-24 left-2 h-full text-white transition-transform lg:translate-x-0 ${isSidebarOpen ? "sidebar open" : "sidebar"} text-3xl`}
      >
        <div className="flex flex-col h-full p-3 space-y-2 bg-neutral-900 rounded-lg text-gray-200 overflow-auto ">
          <UserSideBar
            user={user}
            colorStyle={userColorStyle}
            iconstyle={iconstyle}
            linkstyle={linkstyle}
            onClick={closeSidebar}
          />

          {user.isEntrepreneur && (
            <EnterpriseSideBar
              colorStyle={enterpriseColorStyle}
              onClick={closeSidebar}
            />
          )}

          <AdminSideBar
            user={user}
            colorStyle={adminColorStyle}
            linkstyle={linkstyle}
            onClick={closeSidebar}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
