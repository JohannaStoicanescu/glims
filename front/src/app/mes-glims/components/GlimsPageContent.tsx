'use client';

import { useState, useEffect } from 'react';

import FilterPanel from './FilterPanel';
import FirstTimeUserDisplay from './FirstTimeUserDisplay';
import GlimsDisplay from './GlimsDisplay';
import NoGlimsDisplay from './NoGlimsDisplay';
import { CreateGlimsModal, TutorialModal } from '@/components';
import { useAuthClient, useGetUsersFoldersList } from '@/hooks';
import { Folder } from '@/types';

export default function GlimsPageContent() {
  const authClient = useAuthClient();
  const [userId, setUserId] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setUserId(data?.user?.id ?? '');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // authClient is a module-level singleton, only needs to run once

  const { data: glims, isLoading } = useGetUsersFoldersList(userId);
  const typedGlims = (glims ?? []) as Folder[];

  // glimsToDisplay is null when no filter is active — renders the full list
  const [filteredGlims, setFilteredGlims] = useState<Folder[] | null>(null);
  const glimsToDisplay = filteredGlims ?? typedGlims;

  const [showTutorial, setShowTutorial] = useState(false);

  // Only treat as first-time user once userId is resolved and query has settled
  const isFirstTimeUser = !!userId && !isLoading && typedGlims.length === 0;

  const handleTutorialClose = () => {
    setShowTutorial(false);
  };

  return (
    <div className="flex flex-col flex-1">
      <TutorialModal
        isOpen={showTutorial}
        onClose={handleTutorialClose}
      />

      <CreateGlimsModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-shrink-0">
          {!isFirstTimeUser && typedGlims.length > 0 && (
            <>
              <h3 className="text-xl pl-2 sm:pl-0 sm:text-2xl md:text-3xl font-bold">
                Vos Glims
              </h3>
              <FilterPanel
                glimsToDisplay={glimsToDisplay}
                setGlimsToDisplay={setFilteredGlims}
                initialGlimsToDisplay={typedGlims}
              />
            </>
          )}
        </div>

        {isFirstTimeUser ? (
          <FirstTimeUserDisplay
            onCreateClick={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <>
            {typedGlims.length === 0 ? (
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
