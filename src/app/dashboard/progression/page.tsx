"use client";

import React, { useState } from "react";
import { FollowedDto } from "@/types/followed";
import ProgressionForm from "@/components/ProgressionForm";
import { useFollowed } from "@/hooks/useFollowed";
import ProgressionList from "@/components/ProgressionList";

export default function FollowedList() {
  const {
    loading,
    error,
    followedList,
    addFollowed,
    modifyFollowed,
    removeFollowed,
  } = useFollowed();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFollowed, setEditingFollowed] = useState<FollowedDto | null>(
    null
  );

  const handleCreateFollowed = async (progression: FollowedDto) => {
    if (editingFollowed) {
      await modifyFollowed(editingFollowed.id!, progression);
    } else {
      await addFollowed(progression);
    }
    setIsModalOpen(false);
    setEditingFollowed(null);
  };

  const handleEditFollowed = (followed: FollowedDto) => {
    setEditingFollowed(followed);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition justify-center"
      >
        Create Followed Item
      </button>

      {isModalOpen && (
        <ProgressionForm
          onSubmit={handleCreateFollowed}
          onClose={() => setIsModalOpen(false)}
          followedItem={editingFollowed || undefined}
        />
      )}

      {loading && (
        <div className="flex items-center justify-center h-24">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {followedList && followedList.length > 0 ? (
        <ProgressionList
          progressions={followedList}
          onEdit={handleEditFollowed}
          removeFollowed={removeFollowed}
        />
      ) : (
        <p className="mt-4 text-center">No followed items found.</p>
      )}
    </div>
  );
}
