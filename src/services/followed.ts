import { FollowedDto } from "@/types/followed";
import { cookies } from "next/headers";

export async function createFollowed(follow: FollowedDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookies().get("token")}`,
    },
    body: JSON.stringify(follow),
  });

  if (!res.ok) {
    throw new Error("Failed to create followed entry. Please try again.");
  }

  return await res.json();
}

export async function getAllFollowed() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${cookies().get("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch followed entries.");
  }

  return await res.json();
}

export async function updateFollowed(id: number, follow: FollowedDto) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookies().get("token")}`,
    },
    body: JSON.stringify(follow),
  });

  if (!res.ok) {
    throw new Error("Failed to update followed entry. Please try again.");
  }

  return await res.json();
}

export async function deleteFollowed(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REMPRO_API_URL}/followed/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${cookies().get("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete followed entry.");
  }

  return await res.json();
}
