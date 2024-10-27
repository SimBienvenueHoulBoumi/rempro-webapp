"use client";

import React, { useState } from "react";
import { FollowedDto } from "@/types/followed";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

interface ProgressionFormProps {
  onSubmit: (progression: FollowedDto) => void;
  onClose: () => void;
}

export default function ProgressionForm({ onSubmit, onClose }: ProgressionFormProps) {
  const [name, setName] = useState<string>("");
  const [levelType, setLevelType] = useState<string>("MOVIE");
  const [levelNumber, setLevelNumber] = useState<string>("");
  const [episodeNumber, setEpisodeNumber] = useState<string>("");

  const levelTypeOptions = [
    { value: "MOVIE", label: "Movie" },
    { value: "SHOW", label: "Show" },
    { value: "DOCUMENTARY", label: "Documentary" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const progression: FollowedDto = {
      name,
      levelType,
      levelNumber: levelNumber ? Number(levelNumber) : 0, // Convert to number
      episodeNumber: episodeNumber ? Number(episodeNumber) : 0, // Convert to number
    };

    // Call the onSubmit function with the new progression
    onSubmit(progression);

    // Reset the form
    setName("");
    setLevelType("MOVIE");
    setLevelNumber("");
    setEpisodeNumber("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60"> {/* Updated z-index to 60 */}
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full mx-4"> {/* Modal container with responsive padding */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-lg font-bold mb-4 text-center">Create a New Followed Item</h2>

          {/* Field for the name */}
          <FormInput
            label="Name"
            type="text"
            placeholder="Name of the followed item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Field for level type with a select */}
          <FormSelect
            label="Level Type"
            options={levelTypeOptions}
            value={levelType}
            onChange={(e) => setLevelType(e.target.value)}
            required
          />

          {/* Field for level number */}
          <FormInput
            label="Level Number"
            type="number"
            placeholder="Level number"
            value={levelNumber}
            onChange={(e) => setLevelNumber(e.target.value)}
            required
          />

          {/* Field for episode number */}
          <FormInput
            label="Episode Number"
            type="number"
            placeholder="Episode number"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            required
          />

          {/* Container for buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-2 sm:mb-0"
            >
              Create
            </button>

            <button
              type="button"
              onClick={onClose} // Close the modal when clicked
              className="w-full sm:w-auto p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
