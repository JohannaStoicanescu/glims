'use client';

import { useState } from 'react';

interface InputFormProps {
  label: string;
  showLabel?: boolean;
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputForm({
  label,
  showLabel = true,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}: InputFormProps) {
  const [inputValue, setInputValue] = useState(value || '');

  return (
    <>
      <label
        className="text-black mb-1"
        id={name}
        htmlFor={name}
        aria-label={label}>
        {showLabel && <span>{label}</span>}
      </label>
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange?.(e);
        }}
        id={name}
        placeholder={placeholder}
        required={required}
        className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 hover:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
      />
    </>
  );
}
