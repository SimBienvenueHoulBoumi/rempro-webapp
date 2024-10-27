"use client";

import React, { useState } from "react";
import { FollowedDto } from "@/types/followed";
import ProgressionForm from "@/components/ProgressionForm";
import { useFollowed } from "@/hooks/useFollowed"; // Ensure the import path is correct
import ProgressionList from "@/components/ProgressionList";

export default function FollowedList() {
  const { loading, error, followedList, addFollowed, removeFollowed } = useFollowed();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle the submission of the form
  const handleCreateFollowed = async (progression: FollowedDto) => {
    try {
      await addFollowed(progression);
      setIsModalOpen(false); // Close the modal after successful submission
    } catch (err) {
      console.error("Failed to create followed item:", err);
      // Optionally, you can set an error state here to display to the user
    }
  };

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Followed Items</h1>

      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Create Followed Item
      </button>

      {/* Modal for the Progression Form */}
      {isModalOpen && (
        <div>
          <ProgressionForm
            onSubmit={handleCreateFollowed}
            onClose={closeModal}
          />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Use ProgressionList instead of a regular list */}
      {followedList && followedList.length > 0 ? (
        <ProgressionList
          progressions={followedList}
          removeFollowed={removeFollowed} // Pass down the remove function
        />
      ) : (
        <p className="mt-4">No followed items found.</p>
      )}
    </div>
  );
}
