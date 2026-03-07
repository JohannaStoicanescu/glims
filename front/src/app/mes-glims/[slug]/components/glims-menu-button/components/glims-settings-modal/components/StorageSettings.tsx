'use client';

export default function StorageSettings() {
  const usedStorage = 3.5;
  const totalStorage = 15;
  const percentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="flex flex-col gap-8 pb-4">
      <div className="space-y-2">
        <h4 className=" text-gray-900 mb-6">Stockage disponible</h4>

        <div className="flex flex-col gap-3">
          <p className="font-bold text-gray-900">
            {usedStorage.toString().replace('.', ',')}Go sur vos {totalStorage}
            Go
          </p>

          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
