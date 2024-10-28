"use client";

import React, { useState, useEffect } from "react";
import { FollowedDto } from "@/types/followed";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

interface ProgressionFormProps {
  followedItem?: FollowedDto; // Optional prop for editing
  onSubmit: (progression: FollowedDto) => void;
  onClose: () => void;
}

export default function ProgressionForm({ followedItem, onSubmit, onClose }: ProgressionFormProps) {
  const [name, setName] = useState<string>("");
  const [levelType, setLevelType] = useState<string>("MOVIE");
  const [levelNumber, setLevelNumber] = useState<string>("");
  const [episodeNumber, setEpisodeNumber] = useState<string>("");

  // Update form fields if an existing item is provided
  useEffect(() => {
    if (followedItem) {
      setName(followedItem.name || "");
      setLevelType(followedItem.levelType || "MOVIE");
      setLevelNumber(followedItem.levelNumber?.toString() || "");
      setEpisodeNumber(followedItem.episodeNumber?.toString() || "");
    }
  }, [followedItem]);

  const levelTypeOptions = [
    { value: "MOVIE", label: "Movie" },
    { value: "ANIME", label: "Anime" },
    { value: "SERIES", label: "Series" },
    { value: "WEBTOON", label: "Webtoon" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const progression: FollowedDto = {
      id: followedItem?.id,
      name,
      levelType,
      levelNumber: levelNumber ? Number(levelNumber) : 0,
      episodeNumber: episodeNumber ? Number(episodeNumber) : 0,
    };

    onSubmit(progression);

    // Reset the form only when not editing
    if (!followedItem) {
      setName("");
      setLevelType("MOVIE");
      setLevelNumber("");
      setEpisodeNumber("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full mx-4">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-lg font-bold mb-4 text-center">
            {followedItem ? "Edit Followed Item" : "Create a New Followed Item"}
          </h2>

          <FormInput
            label="Name"
            type="text"
            placeholder="Name of the followed item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormSelect
            label="Level Type"
            options={levelTypeOptions}
            value={levelType}
            onChange={(e) => setLevelType(e.target.value)}
            required
          />

          <FormInput
            label="Level Number"
            type="number"
            placeholder="Level number"
            value={levelNumber}
            onChange={(e) => setLevelNumber(e.target.value)}
            required
          />

          <FormInput
            label="Episode Number"
            type="number"
            placeholder="Episode number"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            required
          />

          <div className="flex flex-col sm:flex-row justify-between mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-2 sm:mb-0"
            >
              {followedItem ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
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
