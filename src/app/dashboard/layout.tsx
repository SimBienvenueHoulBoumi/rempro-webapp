"use client";

import React, { useState, useEffect } from "react";
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

import { logout } from "@/services/authenticate";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const handleLogout = () => {
    logout();
    redirect(`/`);
  };

  const checkScreenSize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Close the sidebar if in mobile view
    if (mobile) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    checkScreenSize(); // Check screen size on initial render
    window.addEventListener("resize", checkScreenSize); // Add resize event listener

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-base-200 text-base-content h-full transition-all duration-300 fixed top-0 left-0 flex flex-col justify-between ${
          collapsed ? "w-15" : "w-64"
        } z-50`}
      >
        {/* Upper section of the menu */}
        <ul className="menu space-y-2">
          <li>
            <button className="btn btn-square" onClick={toggleSidebar}>
              {/* Icon to toggle the menu */}
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
            <Link href="/dashboard/home" className="flex items-center">
              <FaHome size={14} />
              {!collapsed && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link href="/dashboard/progression" className="flex items-center">
              <FaChartLine size={14} />
              {!collapsed && <span>Progression</span>}
            </Link>
          </li>
        </ul>

        {/* Bottom section of the menu */}
        <ul className="menu space-y-2 mb-4">
          <li>
            <Link href="/dashboard/settings" className="flex items-center">
              <FaCog size={14} />
              {!collapsed && <span>Settings</span>}
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="flex items-center">
              <FaUser size={14} />
              {!collapsed && <span>Profile</span>}
            </Link>
          </li>
          <li>
            <button
              className="flex items-center text-red-500"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={14} />
              {!collapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 flex-grow p-1 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
