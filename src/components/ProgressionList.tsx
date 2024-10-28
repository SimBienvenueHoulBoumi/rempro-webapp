"use client";

import React, { useState } from "react";
import { FollowedItem, ProgressionListProps } from "@/types/followed";
import Modal from "./Modal";

const ITEMS_PER_PAGE = 5;

export default function ProgressionList({
  progressions,
  onEdit,
  removeFollowed,
}: ProgressionListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<FollowedItem | null>(null);

  const totalPages = Math.ceil(progressions.length / ITEMS_PER_PAGE);
  const currentItems = progressions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleShowDetails = (item: FollowedItem) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  // Formate une date pour un affichage plus clair en anglais
  const FORMAT_DATE = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      `, ` +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  return (
    <div>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id} className="my-1 bg-white p-1 rounded-sm">
            <div className="flex justify-between items-center">
              <span>{item.name}</span>
              <div className="space-x-2 text-xs">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleShowDetails(item)}
                  className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Details
                </button>
                <button
                  onClick={() => removeFollowed(item.id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="p-1 w-16 mx-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="p-1">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="p-1 w-16 mx-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Modal to display details */}
      {showModal && currentItem && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Details of {currentItem.name}
          </h2>

          <p>
            <strong>Type:</strong> {currentItem.levelType}
          </p>
          <p>
            <strong>Level:</strong> {currentItem.levelNumber}
          </p>
          <p>
            <strong>Episode:</strong> {currentItem.episodeNumber}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Creation Details:</h3>
            <p>
              <strong>Created on:</strong> {FORMAT_DATE(currentItem.createdAt)}
            </p>
            <p>
              <strong>Updated on:</strong> {FORMAT_DATE(currentItem.updatedAt)}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
