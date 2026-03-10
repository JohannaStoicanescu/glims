'use client';

import { useState } from 'react';

import { DisplayMode } from '@/types';
import FilterPanel from './filter-panel/FilterPanel';
import ImageGallery from './gallery/ImageGallery';
import { Picture } from './gallery/components/GalleryImage';
import AddMediaButton from './AddMediaButton';
import GlimsMenuButton from './glims-menu-button/GlimsMenuButton';
import { useGetFolderById, useGetMediaByFolderId } from '@/hooks';

interface GlimsDetailsPageContentProps {
  folderId: string;
}

export default function GlimsDetailsPageContent({
  folderId,
}: GlimsDetailsPageContentProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('default');

  const { data: folder } = useGetFolderById(folderId);
  const { data: pictures = [] } = useGetMediaByFolderId(folderId);

  const picturesToDisplay = pictures as Picture[];

  const handleDisplayModeChange = (mode: DisplayMode) => {
    if (mode === displayMode) return;
    setDisplayMode(mode);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-shrink-0">
        <div className="flex w-full justify-between items-center">
          <h3 className="text-xl pl-2 sm:pl-0 sm:text-2xl md:text-3xl font-bold">
            {folder?.title ?? 'Titre du Glims'}
          </h3>
          <GlimsMenuButton
            pictures={picturesToDisplay}
            glimsName={folder?.title ?? 'Titre du Glims'}
            folderId={folderId}
          />
        </div>
        <FilterPanel
          displayMode={displayMode}
          onDisplayModeChange={handleDisplayModeChange}
        />
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <ImageGallery
          pictures={picturesToDisplay}
          displayMode={displayMode}
        />
      </div>

      <AddMediaButton folderId={folderId} />
    </div>
  );
}
