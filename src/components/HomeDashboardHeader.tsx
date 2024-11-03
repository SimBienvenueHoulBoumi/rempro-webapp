"use client";

import React from "react";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function HomeDashboardHeader() {
  const { profileUser, user } = useAuth(); // Utilisez 'user' ici

  useEffect(() => {
    profileUser();
  }, []);

  return (
    <div className="bg-green-100 shadow-md rounded-sm">
      <h1 className="p-2 flex justify-between">
        <span className="uppercase">Wellcome back</span>,{" "}
        <span className="font-bold">{user?.username}</span>
      </h1>
    </div>
  );
}
