"use client";

import { useState, useEffect } from "react";
import { FollowedDto, FollowedItem, UseFollowedReturn } from "@/types/followed";
import {
  createFollowed,
  getAllFollowed,
  updateFollowed,
  deleteFollowed,
} from "@/services/followed";

export function useFollowed(): UseFollowedReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [followedList, setFollowedList] = useState<FollowedItem[] | null>(null);

  // Récupérer la liste des suivis
  const fetchFollowed = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const followed: FollowedItem[] = await getAllFollowed();
      setFollowedList(followed); 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to fetch followed items.");
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un élément suivi
  const addFollowed = async (follow: FollowedDto): Promise<void | null> => {
    setLoading(true);
    setError(null);

    try {
      await createFollowed(follow);
      await fetchFollowed();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to add followed item.");
    } finally {
      setLoading(false);
    }
  };

  // Modifier un élément suivi
  const modifyFollowed = async (
    id: number,
    follow: FollowedDto
  ): Promise<void | null> => {
    setLoading(true);
    setError(null);

    try {
      await updateFollowed(id, follow);
      await fetchFollowed();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to update followed item.");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un élément suivi
  const removeFollowed = async (id: number): Promise<void | null> => {
    setLoading(true);
    setError(null);

    try {
      await deleteFollowed(id);
      await fetchFollowed();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to delete followed item.");
    } finally {
      setLoading(false);
    }
  };

  // Charger la liste des éléments suivis au montage du hook
  useEffect(() => {
    fetchFollowed();
  }, []);

  return {
    loading,
    error,
    followedList,
    fetchFollowed,
    addFollowed,
    modifyFollowed,
    removeFollowed,
  };
}
