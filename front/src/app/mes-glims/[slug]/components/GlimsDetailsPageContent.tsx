'use client';

import { useEffect, useState } from 'react';

import { DisplayMode } from '@/types';
import FilterPanel from './filter-panel/FilterPanel';
import ImageGallery from './gallery/ImageGallery';
import { Picture } from './gallery/components/GalleryImage';
import AddMediaButton from './AddMediaButton';
import GlimsMenuButton from './glims-menu-button/GlimsMenuButton';

export default function GlimsDetailsPageContent() {
  const [picturesToDisplay, setPicturesToDisplay] = useState<Picture[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('default');

  // TODO: get details of a glims from API or cache based on slug param
  const getPictures = async () => {
    const res = await fetch('https://picsum.photos/v2/list?limit=60');
    const picturesData = await res.json();
    return picturesData as Picture[];
  };

  const fetchPictures = async () => {
    const fetchedPictures = await getPictures();
    setPicturesToDisplay(fetchedPictures);
  };

  useEffect(() => {
    fetchPictures();
    // fetchPictures is defined in component scope and stable for mount-only fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisplayModeChange = (mode: DisplayMode) => {
    if (mode === displayMode) return;
    setDisplayMode(mode);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-shrink-0">
        <div className="flex w-full justify-between items-center">
          <h3 className="text-xl pl-2 sm:pl-0 sm:text-2xl md:text-3xl font-bold">
            Titre du Glims
          </h3>
          <GlimsMenuButton
            pictures={picturesToDisplay}
            glimsName="Titre du Glims"
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

      <AddMediaButton
        onFilesSelected={(files) => {
          console.log('Fichiers à uploader:', files);
          // TODO: Uploader les fichiers vers l'API
        }}
      />
    </div>
  );
}
