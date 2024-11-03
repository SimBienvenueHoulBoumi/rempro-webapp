"use server";

import { FollowedDto } from "@/types/followed";
import { cookies } from "next/headers";

const cookieStore = cookies();
const token = cookieStore.get("token");

export async function createFollowed(follow: FollowedDto) {
  try {
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
  } catch (error) {
    console.error("An error occurred while creating followed entry:", error);
    throw error;
  }
}

export async function getAllFollowed() {
  try {
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
      console.error("Error fetching followed entries:", errorText);
      // throw new Error("Failed to fetch followed entries.");
    }
    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching followed entries:", error);
    throw error;
  }
}

export async function updateFollowed(id: number, follow: FollowedDto) {
  try {
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
      const errorText = await res.text();
      console.error("Error updating followed entry:", errorText);
      throw new Error("Failed to update followed entry. Please try again.");
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while updating followed entry:", error);
    throw error;
  }
}

export async function deleteFollowed(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error deleting followed entry:", errorText); // Log the error
      throw new Error("Failed to delete followed entry. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while deleting followed entry:", error);
    throw error;
  }
}
