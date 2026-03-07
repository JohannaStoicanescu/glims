'use client';

import { useState, useEffect } from 'react';

import FilterPanel from './FilterPanel';
import FirstTimeUserDisplay from './FirstTimeUserDisplay';
import GlimsDisplay from './GlimsDisplay';
import NoGlimsDisplay from './NoGlimsDisplay';
import { TutorialModal } from '@/app/ui';

type GlimType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function GlimsPageContent() {
  // TODO: get firstTimeUser from API or local storage (this means the user has never seen the tutorial)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  // TODO: get if user has data (folders/glims) from API
  // For now we simulate that if glims list is empty, it's a "first time" empty state
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  const [glims, setGlims] = useState<GlimType[]>([]);
  const [glimsToDisplay, setGlimsToDisplay] = useState<GlimType[]>([]);

  // TODO: get glims from API
  const getGlims = async () => {
    const res = await fetch('https://picsum.photos/v2/list?limit=50');
    const glimsData = await res.json();
    return glimsData as GlimType[];
  };

  useEffect(() => {
    const fetchGlims = async () => {
      const fetchedGlims = await getGlims();
      setGlims(fetchedGlims);
      setGlimsToDisplay(fetchedGlims);
      setIsFirstTimeUser(fetchedGlims.length === 0);
    };
    fetchGlims();

    // Check if we should show the tutorial (if never seen)
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [hasSeenTutorial]);

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
    // TODO: Call API to update user preference so tutorial doesn't show again
  };

  return (
    <div className="flex flex-col flex-1">
      <TutorialModal
        isOpen={showTutorial}
        onClose={handleTutorialClose}
      />

      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-shrink-0">
          {!isFirstTimeUser && (
            <>
              <h3 className="text-xl pl-2 sm:pl-0 sm:text-2xl md:text-3xl font-bold">
                Vos Glims
              </h3>
              <FilterPanel
                glimsToDisplay={glimsToDisplay}
                setGlimsToDisplay={setGlimsToDisplay}
                initialGlimsToDisplay={glims}
              />
            </>
          )}
        </div>

        {isFirstTimeUser ? (
          <FirstTimeUserDisplay />
        ) : (
          <>
            {glims.length === 0 ? (
              <NoGlimsDisplay />
            ) : (
              <GlimsDisplay glims={glimsToDisplay} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
