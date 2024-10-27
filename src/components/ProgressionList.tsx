"use client"

import { FollowedItem } from "@/types/followed";
import React, { useState } from "react";

interface ProgressionListProps {
  progressions: FollowedItem[]; // Specify the prop type
  removeFollowed: (id: number) => Promise<void | null>; // Ensure this matches your removeFollowed function
}

const ITEMS_PER_PAGE = 5;

const ProgressionList: React.FC<ProgressionListProps> = ({
  progressions,
  removeFollowed,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FollowedItem | null>(null);

  // Calculate total pages
  const totalPages = Math.ceil(progressions.length / ITEMS_PER_PAGE);

  // Get the current items to display
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = progressions.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Open the confirmation modal
  const openModal = (progression: FollowedItem) => {
    setItemToDelete(progression);
    setIsModalOpen(true);
  };

  // Close the confirmation modal
  const closeModal = () => {
    setItemToDelete(null);
    setIsModalOpen(false);
  };

  // Handle delete action
  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await removeFollowed(itemToDelete.id);
        closeModal(); // Close the modal after deletion
      } catch (error) {
        setErrorMessage("Erreur lors de la suppression de l'élément. Veuillez réessayer.");
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Progression list</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Error message display */}

      <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 border-b border-gray-300 text-left">Name</th>
            <th className="py-3 px-6 border-b border-gray-300 text-left">Type</th>
            <th className="py-3 px-6 border-b border-gray-300 text-left">Level</th>
            <th className="py-3 px-6 border-b border-gray-300 text-left">Episode</th>
            <th className="py-3 px-6 border-b border-gray-300 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentItems.map((progression) => (
            <tr key={progression.id} className="hover:bg-gray-100 transition">
              <td className="py-3 px-6 border-b border-gray-300">{progression.name}</td>
              <td className="py-3 px-6 border-b border-gray-300">{progression.levelType}</td>
              <td className="py-3 px-6 border-b border-gray-300">{progression.levelNumber}</td>
              <td className="py-3 px-6 border-b border-gray-300">{progression.episodeNumber}</td>
              <td className="py-3 px-6 border-b border-gray-300 text-center">
                <button
                  onClick={() => openModal(progression)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer « {itemToDelete?.name} » ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mr-2 px-4 py-2 border rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition"
          }`}
        >
          Précédent
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 border rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 transition"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-2 px-4 py-2 border rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition"
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProgressionList;
