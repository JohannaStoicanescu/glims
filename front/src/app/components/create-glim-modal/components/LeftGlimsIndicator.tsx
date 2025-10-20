import Image from 'next/image';

interface LeftGlimsIndicatorProps {
  readonly remainingGlims: string;
}

export function LeftGlimsIndicator({
  remainingGlims,
}: LeftGlimsIndicatorProps) {
  return (
    <div className="flex justify-center items-center gap-3 bg-white md:rounded-b-2xl">
      <div className="text-sm text-gray-600 align-middle text-center">
        Encore{' '}
        <span className="pb-1 inline-flex items-center gap-1 align-middle">
          <Image
            src={'/glims.png'}
            alt={'Logo de Glims'}
            width={20}
            height={20}
          />
          <span className="text-orange-500 align-middle">
            {remainingGlims} Glims
          </span>
        </span>{' '}
        disponibles avec votre compte.
      </div>
    </div>
  );
}
