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

  const FORMAT_DATE = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto text-xs">
      <ul className="bg-white shadow-md rounded-md divide-y divide-gray-200">
        {currentItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-700">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500">
                Level: {item.levelNumber} | Episode: {item.episodeNumber}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleShowDetails(item)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Details
              </button>
              <button
                onClick={() => removeFollowed(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300 mx-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300 mx-2"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && currentItem && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">
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
