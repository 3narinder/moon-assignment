"use client";

import React, { useState } from "react";

interface InputFieldProps {
  type?: string;
  name?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  errorMessage,
}) => {
  const [touched, setTouched] = useState(false);
  const showError = touched && required && !value;

  return (
    <div className="w-full relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onBlur={() => setTouched(true)}
        className={`w-full px-4 py-2.5 border outline-none placeholder:text-neutral-5 text-neutral-8 text-display-2
          ${
            showError || errorMessage
              ? "border-red-500"
              : "border-neutral-8 focus:border-blue-500"
          }`}
      />
      <div className="">
        {(showError || errorMessage) && (
          <p className="text-red-500 text-sm absolute">
            {errorMessage || "Invalid input."}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
