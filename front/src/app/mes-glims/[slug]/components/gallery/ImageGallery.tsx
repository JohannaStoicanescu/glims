'use client';

import { useState } from 'react';

import { DisplayMode } from '@/types';
import { Picture, MasonryGallery, GridGallery, ImageModal } from './components';

interface ImageGalleryProps {
  pictures: Picture[];
  displayMode: DisplayMode;
  availableReactions?: { id: string; name: string; svg: string }[];
}

export default function ImageGallery({
  pictures,
  displayMode,
  availableReactions = [],
}: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNavigate = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (pictures.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Aucune image à afficher
      </div>
    );
  }

  return (
    <>
      {displayMode === 'default' ? (
        <MasonryGallery
          pictures={pictures}
          onImageClick={handleImageClick}
        />
      ) : displayMode === 'square' ||
        displayMode === 'landscape' ||
        displayMode === 'portrait' ? (
        <GridGallery
          pictures={pictures}
          mode={displayMode}
          onImageClick={handleImageClick}
        />
      ) : (
        <MasonryGallery
          pictures={pictures}
          onImageClick={handleImageClick}
        />
      )}

      {selectedImageIndex !== null && (
        <ImageModal
          picture={pictures[selectedImageIndex]}
          pictures={pictures}
          currentIndex={selectedImageIndex}
          availableReactions={availableReactions}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
