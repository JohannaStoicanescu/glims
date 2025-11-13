'use client';

import { useState } from 'react';

import FilterPanel from './FilterPanel';
import FirstTimeUserDisplay from './FirstTimeUserDisplay';
import GlimsDisplay from './GlimsDisplay';
import NoGlimsDisplay from './NoGlimsDisplay';

export default function GlimsPageContent() {
  // TODO: get firstTimeUser from API
  const firstTimeUser = false;
  // TODO: get glims from API
  const glims: any[] = [
    // 'https://i.pravatar.cc/300',
    // 'https://i.pravatar.cc/500',
    // 'https://i.pravatar.cc/300',
    // 'https://i.pravatar.cc/600',
    // 'https://i.pravatar.cc/700',
    // 'https://i.pravatar.cc/700',
    // 'https://i.pravatar.cc/200',
  ];
  const [glimsToDisplay, setGlimsToDisplay] = useState(glims);

  return (
    <div className="flex flex-col flex-1">
      {firstTimeUser ? (
        <FirstTimeUserDisplay />
      ) : (
        !firstTimeUser && (
          <div className="flex flex-col flex-1">
            <div>
              <h3 className="text-xl pl-2 sm:pl-0 sm:text-2xl md:text-3xl font-bold">
                Vos Glims
              </h3>
              <FilterPanel
                glimsToDisplay={glimsToDisplay}
                setGlimsToDisplay={setGlimsToDisplay}
              />
            </div>
            {glims.length === 0 && <NoGlimsDisplay />}
            {glims.length > 0 && <GlimsDisplay glims={glimsToDisplay} />}
          </div>
        )
      )}
    </div>
  );
}
