"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaChartLine,
  FaCog,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

import { logout as logoutService } from "@/services/authenticate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const checkScreenSize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await logoutService();
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-base-200 text-base-content h-full transition-all duration-300 fixed top-0 left-0 flex flex-col justify-between ${
          collapsed ? "w-15" : "w-64"
        } z-50`}
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
            <form onSubmit={handleLogout}>
              <button
                className="flex items-center text-red-500 space-x-2"
                type="submit"
              >
                <FaSignOutAlt size={14} />
                {!collapsed && <span>Logout</span>}
              </button>
            </form>
          </li>
        </ul>
      </div>

      <div
        className={`transition-all duration-300 flex-grow p-1 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
