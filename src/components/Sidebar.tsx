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
import { useRouter, usePathname } from "next/navigation";
import { logout as logoutService } from "@/services/authenticate";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutService();
    router.push("/");
  };

  const isActive = (route: string) =>
    pathname === route ? "bg-gray-300" : "hover:bg-gray-300";

  return (
    <div
      className={`bg-white text-base-content h-full transition-all duration-300 ease-in-out fixed top-0 left-0 flex flex-col justify-between ${
        collapsed ? "w-16" : "w-64"
      } z-50 overflow-hidden`}
    >
      <ul className="menu space-y-2 bg-white">
        <li>
          <button className="btn btn-square" onClick={toggleSidebar}>
            <span>
              {collapsed ? (
                <FaChevronRight size={16} />
              ) : (
                <FaChevronLeft size={16} />
              )}
            </span>
          </button>
        </li>
        <li>
          <Link
            href="/dashboard/home"
            className={`sidebar-button ${isActive("/dashboard/home")} ${
              collapsed ? "text-center" : ""
            } flex items-center p-2 rounded`}
          >
            {collapsed ? (
              <span className="flex justify-center items-center w-full">
                <FaHome size={16} />
              </span>
            ) : (
              <>
                <FaHome size={16} />
                <span
                  className={`duration-300 ${collapsed ? "hidden" : "block"}`}
                >
                  Home
                </span>
              </>
            )}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/progression"
            className={`sidebar-button ${isActive("/dashboard/progression")} ${
              collapsed ? "text-center" : ""
            } flex items-center p-2 rounded`}
          >
            {collapsed ? (
              <span className="flex justify-center items-center w-full">
                <FaChartLine size={16} />{" "}
              </span>
            ) : (
              <>
                <FaChartLine size={16} />{" "}
                <span
                  className={`duration-300 ${collapsed ? "hidden" : "block"}`}
                >
                  Progression
                </span>
              </>
            )}
          </Link>
        </li>
      </ul>

      <ul className="menu space-y-2 mb-4">
        <li>
          <Link
            href="/dashboard/settings"
            className={`sidebar-button ${isActive("/dashboard/settings")} ${
              collapsed ? "text-center" : ""
            } flex items-center p-2 rounded`}
          >
            {collapsed ? (
              <span className="flex justify-center items-center w-full">
                <FaCog size={16} />
              </span>
            ) : (
              <>
                <FaCog size={16} />
                <span
                  className={`duration-300 ${collapsed ? "hidden" : "block"}`}
                >
                  Settings
                </span>
              </>
            )}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/profile"
            className={`sidebar-button ${isActive("/dashboard/profile")} ${
              collapsed ? "text-center" : ""
            } flex items-center p-2 rounded`}
          >
            {collapsed ? (
              <span className="flex justify-center items-center w-full">
                <FaUser size={16} /> {/* Taille uniforme pour le menu replié */}
              </span>
            ) : (
              <>
                <FaUser size={16} /> {/* Taille uniforme pour le menu étendu */}
                <span
                  className={`duration-300 ${collapsed ? "hidden" : "block"}`}
                >
                  Profile
                </span>
              </>
            )}
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="sidebar-button bg-red-400 hover:bg-red-300 text-black flex items-center justify-center w-full p-2 rounded"
          >
            <FaSignOutAlt size={16} />{" "}
            {/* Taille uniforme pour l'icône de déconnexion */}
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
