'use client';

import { GalleryImage, Picture } from '.';

type GridMode = 'square' | 'landscape' | 'portrait';

interface GridGalleryProps {
  pictures: Picture[];
  mode: GridMode;
  onImageClick?: (index: number) => void;
}

export default function GridGallery({
  pictures,
  mode,
  onImageClick,
}: GridGalleryProps) {
  if (pictures.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Aucune image à afficher
      </div>
    );
  }

  const getGridColumnsClass = () => {
    switch (mode) {
      case 'square':
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
      case 'landscape':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      case 'portrait':
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
      default:
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridColumnsClass()} gap-4`}>
      {pictures.map((picture, index) => (
        <GalleryImage
          key={picture.id}
          picture={picture}
          aspectRatio={mode}
          onClick={() => onImageClick?.(index)}
        />
      ))}
    </div>
  );
}
