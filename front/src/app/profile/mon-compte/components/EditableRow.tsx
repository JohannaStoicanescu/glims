interface EditableRowProps {
  label: string;
  placeholder: string;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  onUpdate: () => void;
  isLoading?: boolean;
}

export default function EditableRow({
  label,
  placeholder,
  error,
  inputProps,
  onUpdate,
  isLoading = false,
}: EditableRowProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-900">{label}</label>

      <div className="pt-2">
        <div className="flex w-full overflow-hidden rounded-xl border border-slate-200 sm:max-w-3xl">
          <input
            {...inputProps}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full px-4 py-3 text-slate-900 outline-none text-xs sm:text-sm placeholder:text-slate-400 hover:bg-slate-50 focus:bg-slate-50 disabled:opacity-50"
          />

          <button
            type="button"
            onClick={onUpdate}
            disabled={isLoading}
            className="bg-black px-4 sm:px-6 py-3 text-[10px] sm:text-sm font-semibold text-white transition cursor-pointer border-l border-slate-200 hover:bg-white hover:text-slate-900 w-32 sm:w-44 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? '...' : 'Mettre à jour'}
          </button>
        </div>
      </div>

      {error && <p className="pt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
