'use client';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { GalleryImage, Picture } from '.';

interface MasonryGalleryProps {
  pictures: Picture[];
  onImageClick?: (index: number) => void;
}

export default function MasonryGallery({
  pictures,
  onImageClick,
}: MasonryGalleryProps) {
  if (pictures.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Aucune image à afficher
      </div>
    );
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3, 1280: 4 }}>
      <Masonry gutter="12px">
        {pictures.map((picture, index) => (
          <GalleryImage
            key={picture.id}
            picture={picture}
            aspectRatio="auto"
            onClick={() => onImageClick?.(index)}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
