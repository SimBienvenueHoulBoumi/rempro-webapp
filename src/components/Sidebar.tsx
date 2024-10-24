"use client";

import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaChartLine,
  FaCog,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { logout as logoutService } from "@/services/authenticate";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutService();
    router.push("/");
  };

  return (
    <div
      className={`bg-base-200 text-base-content h-full transition-all duration-300 ease-in-out fixed top-0 left-0 flex flex-col justify-between ${
        collapsed ? "w-16" : "w-64"
      } z-50 overflow-hidden`}
    >
      <ul className="menu space-y-2">
        <li>
          <button className="btn btn-square" onClick={toggleSidebar}>
            <span>
              {collapsed ? (
                <FaChevronRight size={14} />
              ) : (
                <FaChevronLeft size={14} />
              )}
            </span>
          </button>
        </li>
        <li>
          <Link
            href="/dashboard/home"
            className={`sidebar-button hover:bg-gray-200 ${
              collapsed ? "text-center" : ""
            }`}
          >
            <FaHome size={14} />
            <span className={`duration-300 ${collapsed ? "hidden" : "block"}`}>
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/progression"
            className={`sidebar-button hover:bg-gray-200 ${
              collapsed ? "text-center" : ""
            }`}
          >
            <FaChartLine size={14} />
            <span className={`duration-300 ${collapsed ? "hidden" : "block"}`}>
              Progression
            </span>
          </Link>
        </li>
      </ul>

      <ul className="menu space-y-2 mb-4">
        <li>
          <Link
            href="/dashboard/settings"
            className={`sidebar-button hover:bg-gray-200 ${
              collapsed ? "text-center" : ""
            }`}
          >
            <FaCog size={14} />
            <span className={`duration-300 ${collapsed ? "hidden" : "block"}`}>
              Settings
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/profile"
            className={`sidebar-button hover:bg-gray-200 ${
              collapsed ? "text-center" : ""
            }`}
          >
            <FaUser size={14} />
            <span className={`duration-300 ${collapsed ? "hidden" : "block"}`}>
              Profile
            </span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="sidebar-button hover:bg-red-400 hover:text-black flex items-center justify-start w-full"
          >
            <FaSignOutAlt size={14} />
            <span className={`duration-300 ${collapsed ? "hidden" : "block"}`}>
              Logout
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
