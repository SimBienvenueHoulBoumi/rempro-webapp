"use server";

import { FollowedDto } from "@/types/followed";
import { cookies } from "next/headers";

const cookieStore = cookies();
const token = cookieStore.get("token");

export async function createFollowed(follow: FollowedDto) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify({
        name: follow.name,
        levelType: follow.levelType,
        levelNumber: follow.levelNumber,
        episodeNumber: follow.episodeNumber,
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text(); // Get the error response text for better error handling
    console.error("Error creating followed entry:", errorText); // Log the error
    throw new Error("Failed to create followed entry. Please try again.");
  }

  return await res.json();
}

export async function getAllFollowed() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text(); // Get the error response text
    console.error("Error fetching followed entries:", errorText); // Log the error
    throw new Error("Failed to fetch followed entries.");
  }
  return await res.json();
}

export async function updateFollowed(id: number, follow: FollowedDto) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(follow), // Convert the body to JSON
    }
  );

  if (!res.ok) {
    const errorText = await res.text(); // Get the error response text
    console.error("Error updating followed entry:", errorText); // Log the error
    throw new Error("Failed to update followed entry. Please try again.");
  }

  return await res.json();
}

export async function deleteFollowed(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
}
