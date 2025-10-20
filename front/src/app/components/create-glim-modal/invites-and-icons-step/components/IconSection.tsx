import { useFormContext, Controller } from 'react-hook-form';

export function IconSection() {
  const { control } = useFormContext();

  return (
    <Controller
      name="showReactions"
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <div>
          <div
            className="inline-flex items-center cursor-pointer"
            onClick={() => field.onChange(!field.value)}>
            <div
              className={`relative w-11 h-6 rounded-full transition-all ${
                field.value ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
              <div
                className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${
                  field.value ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
            </div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              Afficher les réactions
            </span>
          </div>

          {/* CONDITIONAL CONTENT */}
          {field.value && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-800 mb-2">
                Icônes de réaction
              </h3>
            </div>
          )}
        </div>
      )}
    />
  );
}
