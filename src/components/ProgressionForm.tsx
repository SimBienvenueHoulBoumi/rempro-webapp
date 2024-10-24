"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function ProgressionForm() {
  const [name, setName] = useState<string>("");
  const [levelType, setLevelType] = useState<string>("MOVIE");
  const [levelNumber, setLevelNumber] = useState<string>("");
  const [episodeNumber, setEpisodeNumber] = useState<string>("");

  const levelTypeOptions = [
    { value: "MOVIE", label: "Movie" },
    { value: "SHOW", label: "Show" },
    { value: "DOCUMENTARY", label: "Documentary" },
  ];

  return (
    <form>
      <h2 className="text-lg font-bold mb-4">Create a New Followed Item</h2>

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

      {/* Submit button */}
      <button
        type="submit"
        className="
          mt-4 
          p-3 
          bg-blue-500 
          text-white 
          rounded-lg 
          hover:bg-blue-700 
          transition-colors 
          duration-300
        "
      >
        Create
      </button>
    </form>
  );
}
