"use client";

import React, { useState } from "react";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    console.log("User logged out");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-base-200 text-base-content h-full p-2 transition-all duration-300 fixed top-0 left-0 flex flex-col justify-between ${
          collapsed ? "w-20" : "w-64"
        } z-50`}
      >
        {/* Upper section of the menu */}
        <ul className="menu space-y-2">
          <li>
            <button className="btn btn-square" onClick={toggleSidebar}>
              {/* Icon to show the menu */}
              <span className="mx-1">
                {collapsed ? (
                  <FaChevronRight size={14} />
                ) : (
                  <FaChevronLeft size={14} />
                )}
              </span>
            </button>
          </li>
          <li>
            <Link href="/dashboard/home" className="flex items-center">
              <FaHome size={14} />
              {!collapsed && <span className="mx-1">Home</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/save-progression"
              className="flex items-center"
            >
              <FaChartLine size={14} />
              {!collapsed && <span className="mx-1">Progression</span>}
            </Link>
          </li>
        </ul>

        {/* Bottom section of the menu */}
        <ul className="menu space-y-2 mb-4">
          <li>
            <Link href="/dashboard/settings" className="flex items-center">
              <FaCog size={14} />
              {!collapsed && <span className="mx-1">Settings</span>}
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="flex items-center">
              <FaUser size={14} />
              {!collapsed && <span className="mx-1">Profile</span>}
            </Link>
          </li>
          <li>
            <button
              className="flex items-center text-red-500"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={14} />
              {!collapsed && <span className="mx-1">Logout</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 flex-grow p-6 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
