"use client";

import { ModalProps } from "@/types/Modal";
import React from "react";

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, children }) => {
  if (!showModal) return null;

  // Fonction pour gérer le clic à l'extérieur de la modale
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
