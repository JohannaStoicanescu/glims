'use client';

import { useFormContext, FieldError } from 'react-hook-form';

interface ControlledInputFormProps {
  readonly label: string;
  readonly showLabel?: boolean;
  readonly type: string;
  readonly name: string;
  readonly placeholder: string;
  readonly required?: boolean;
  readonly validation?: object;
}

export default function ControlledInputForm({
  label,
  showLabel = true,
  type,
  name,
  placeholder,
  required = false,
  validation = {},
}: ControlledInputFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError;

  return (
    <div>
      <label
        className="text-black font-medium pb-2 block"
        htmlFor={name}
        aria-label={label}>
        {showLabel && <span>{label}</span>}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={`w-full border p-3 rounded-lg bg-gray-50 hover:border-orange-600 focus:outline-none focus:ring focus:ring-orange-600 transition ${
          error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200'
        }`}
        {...register(name, {
          required: required ? `${label} est requis` : false,
          ...validation,
        })}
      />
      {error && (
        <p
          className="mt-1 text-sm text-red-600"
          role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
