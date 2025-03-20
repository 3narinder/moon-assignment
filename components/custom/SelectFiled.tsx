import React, { useState, ReactNode } from "react";

interface SelectFieldProps {
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  children: ReactNode;
  small?: boolean;
  errorMessage?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  value,
  onChange,
  required = false,
  children,
  small,
  errorMessage,
}) => {
  const [touched, setTouched] = useState(false);
  const showError = touched && required && !value;

  return (
    <div className="w-full relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onBlur={() => setTouched(true)}
        className={`${
          small ? "w-1/3" : "w-full"
        } px-4 py-2.5 border outline-none text-neutral-8 text-display-2
          ${
            showError || errorMessage
              ? "border-red-500"
              : "border-neutral-8 focus:border-blue-500"
          }`}
      >
        {children}
      </select>
      <div className="">
        {(showError || errorMessage) && (
          <p className="text-red-500 text-sm absolute">
            {errorMessage || "Invalid selection."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectField;
