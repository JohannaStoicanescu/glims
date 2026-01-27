'use client';

import { useEffect, useState } from 'react';

import { DisplayMode } from '@/types';
import FilterPanel from './FilterPanel';

type Picture = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function GlimsDetailsPageContent() {
  const [picturesToDisplay, setPicturesToDisplay] = useState<Picture[]>([]);
  const [displayMode] = useState<DisplayMode>('default');

  useEffect(() => {
    // TODO: get details of a glims from API or cache based on slug param
    const getPictures = async () => {
      const res = await fetch('https://picsum.photos/v2/list?limit=60');
      const picturesData = await res.json();
      console.log(picturesToDisplay);
      return picturesData as Picture[];
    };

    const fetchPictures = async () => {
      const fetchedPictures = await getPictures();
      setPicturesToDisplay(fetchedPictures);
    };

    fetchPictures();
  }, [picturesToDisplay]);

  const handleDisplayModeChange = (mode: DisplayMode) => {
    if (mode === displayMode) return;
  };

  // const renderGallery = () => {
  //   if (picturesToDisplay.length === 0) {
  //     return null;
  //   }

  //   if (displayMode === 'default') {
  //     return <>masonry</>;
  //   }

  //   return <></>;
  // };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-shrink-0">
        <h3 className="text-xl pl-2 sm:pl-0 sm:text-2xl md:text-3xl font-bold">
          Titre du Glims
        </h3>

        <FilterPanel
          displayMode={displayMode}
          onDisplayModeChange={handleDisplayModeChange}
        />
      </div>
      <div className="flex-1 overflow-hidden"></div>
    </div>
  );
}
