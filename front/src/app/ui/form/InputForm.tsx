'use client';

import { useState } from 'react';

interface InputFormProps {
  readonly label?: string;
  readonly ariaLabel?: string;
  readonly showLabel?: boolean;
  readonly type: string;
  readonly name: string;
  readonly placeholder: string;
  readonly value?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly required?: boolean;
}

export default function InputForm({
  label,
  ariaLabel,
  showLabel = true,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}: InputFormProps) {
  const [inputValue, setInputValue] = useState(value || '');
  const effectiveLabel = label || ariaLabel;

  return (
    <div>
      <label
        className={`text-black font-medium block ${label || ariaLabel ? 'mb-2' : ''}`}
        htmlFor={name}>
        {showLabel ? (
          <span>{label}</span>
        ) : (
          effectiveLabel && <span className="sr-only">{effectiveLabel}</span>
        )}
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
        aria-label={!showLabel && !effectiveLabel ? placeholder : undefined}
        className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 
        hover:border-orange-600 focus:outline-none focus:ring focus:ring-orange-600 transition"
      />
    </div>
  );
}
