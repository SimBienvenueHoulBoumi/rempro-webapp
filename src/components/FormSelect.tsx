import React from 'react';

interface FormSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, options, value, onChange, required }) => {
  return (
    <div className="form-control">
      <label className="label text-[13px] font-semibold text-gray-700">
        <span className="label-text">{label}</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className="
          select 
          bg-gray-800 
          focus:bg-gray-500
          text-white 
          select-bordered 
          w-full 
          p-2 
          rounded-lg 
          border border-gray-700 
          focus:outline-none 
          focus:ring-4 
          focus:ring-blue-500 
          focus:ring-opacity-50 
          transition-all duration-300
          text-[14px]  {/* Ajustement de la taille du texte */}
        "
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
