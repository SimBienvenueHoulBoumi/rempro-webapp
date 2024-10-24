"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function ProgressionForm() {
  const [name, setName] = useState<string>("");
  const [levelType, setLevelType] = useState<string>("MOVIE");
  const [levelNumber, setLevelNumber] = useState<string>("");
  const [episodeNumber, setEpisodeNumber] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [updatedAt, setUpdatedAt] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );

  const levelTypeOptions = [
    { value: "MOVIE", label: "Film" },
    { value: "SHOW", label: "Série" },
    { value: "DOCUMENTARY", label: "Documentaire" },
  ];

  return (
    <form>
      <h2 className="text-lg font-bold mb-4">Créer un nouvel élément suivi</h2>

      {/* Champ pour le nom */}
      <FormInput
        label="Nom"
        type="text"
        placeholder="Nom de l'élément suivi"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Champ pour le type de niveau avec un select */}
      <FormSelect
        label="Type de niveau"
        options={levelTypeOptions}
        value={levelType}
        onChange={(e) => setLevelType(e.target.value)}
        required
      />

      {/* Champ pour le numéro du niveau */}
      <FormInput
        label="Numéro du niveau"
        type="number"
        placeholder="Numéro du niveau"
        value={levelNumber}
        onChange={(e) => setLevelNumber(e.target.value)}
        required
      />

      {/* Champ pour le numéro de l'épisode */}
      <FormInput
        label="Numéro de l'épisode"
        type="number"
        placeholder="Numéro de l'épisode"
        value={episodeNumber}
        onChange={(e) => setEpisodeNumber(e.target.value)}
        required
      />

      {/* Champ pour la date de création */}
      <FormInput
        label="Date de création"
        type="datetime-local"
        placeholder="Date de création"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
        required
      />

      {/* Champ pour la date de mise à jour */}
      <FormInput
        label="Date de mise à jour"
        type="datetime-local"
        placeholder="Date de mise à jour"
        value={updatedAt}
        onChange={(e) => setUpdatedAt(e.target.value)}
        required
      />

      {/* Bouton de soumission */}
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
        Créer
      </button>
    </form>
  );
}
