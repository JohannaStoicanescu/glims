'use client';

import { useState, useEffect } from 'react';

import FilterPanel from './FilterPanel';
import FirstTimeUserDisplay from './FirstTimeUserDisplay';
import GlimsDisplay from './GlimsDisplay';
import NoGlimsDisplay from './NoGlimsDisplay';
import useGetUsersFoldersList from '@/hooks/folders/use-get-users-folders-list';

type GlimType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function GlimsPageContent() {
  // TODO: get firstTimeUser from API
  const firstTimeUser = false;

  const [glims, setGlims] = useState<GlimType[]>([]);
  const [glimsToDisplay, setGlimsToDisplay] = useState<GlimType[]>([]);

  // GET DATA EXEMPLE: there are other usefull object to add to the destructuration like isLoading, isError, refetch, etc.
  // const { data } = useGetUsersFoldersList('connected-user-id');
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
    };

    fetchGlims();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {firstTimeUser ? (
        <FirstTimeUserDisplay />
      ) : (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-shrink-0">
            <h3 className="text-xl pl-2 sm:pl-0 sm:text-2xl md:text-3xl font-bold">
              Vos Glims
            </h3>
            <FilterPanel
              setGlimsToDisplay={setGlimsToDisplay}
              initialGlimsToDisplay={glims}
            />
          </div>
          {glims.length === 0 && <NoGlimsDisplay />}
          {glims.length > 0 && <GlimsDisplay glims={glimsToDisplay} />}
        </div>
      )}
    </div>
  );
}
