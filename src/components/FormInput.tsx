interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, placeholder, required, value, onChange }) => {
  return (
    <div className="form-control">
      <label className="label text-sm font-semibold text-gray-700">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          input 
          bg-gray-800 
          focus:bg-gray-500
          text-white 
          input-bordered 
          w-full 
          p-2 
          sm:p-3
          md:p-4
          lg:p-5
          rounded-lg 
          border border-gray-700 
          focus:outline-none 
          focus:ring-4 
          focus:ring-blue-500 
          focus:ring-opacity-50 
          transition-all duration-300
          text-sm
          sm:text-base
          md:text-lg
          lg:text-xl
        "
        required={required}
      />
    </div>
  );
};

export default FormInput;
