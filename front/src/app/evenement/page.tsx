'use client';

import EventHeader from './components/EventHeader';
import SearchBar from './components/SearchBar';
import PhotoCard from './components/PhotoCard';
import EventFilterPanel from './components/EventFilterPanel';
import { useEffect, useState } from 'react';
import { Media } from '@/types/media';
import Image from 'next/image';
import PhotoCardMenu from './components/PhotoCardMenu';
import { MdKeyboardArrowDown } from 'react-icons/md';
import MultiSelectionMenu from './components/MultiSelectionMenu';

export default function AlbumPage() {
  // TODO: fetch media from API
  const allMedia: Media[] = [
    {
      src: '/media1.jpeg',
      author: 'Samih',
      liked: true,
      views: 5,
      glims: 2,
      date: '2025-01-01T12:00:00Z',
      type: 'photo',
    },
    {
      src: '/media2.jpeg',
      author: 'Caroline',
      liked: false,
      views: 2,
      glims: 2,
      date: '2025-01-02T12:00:00Z',
      type: 'photo',
    },
    {
      src: '/media3.jpeg',
      author: 'Idriss',
      liked: false,
      views: 7,
      glims: 6,
      date: '2025-01-03T12:00:00Z',
      type: 'photo',
    },
    {
      src: '/media4.jpeg',
      author: 'Samih',
      liked: true,
      views: 8,
      glims: 4,
      date: new Date().toISOString(),
      type: 'photo',
    },
    {
      src: '/media5.jpeg',
      author: 'Caroline',
      liked: true,
      views: 7,
      glims: 2,
      date: '2025-05-04T12:00:00Z',
      type: 'photo',
    },
  ];

  const [isMenuDiplayed, setIsMenuDisplayed] = useState(false);
  const [isMultiselectionMenuDisplayed, setIsMultiselectionMenuDisplayed] =
    useState(false);
  const [author, setAuthor] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filteredMedia, setFilteredMedia] = useState(allMedia);
  const [activeFilters, setActiveFilters] = useState({
    sort: 'none',
    type: 'none',
    date: 'none',
  });
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

  const applyFilters = (filters: any) => {
    setActiveFilters(filters);

    let result = [...allMedia];

    if (filters.type !== 'all') {
      result = result.filter((item) => {
        if (filters.type === 'photos') return item.type === 'photo';
        if (filters.type === 'videos') return item.type === 'video';
        return true;
      });
    }

    if (filters.date === 'last24h') {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= oneDayAgo;
      });
    }

    if (filters.sort === 'latest') {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (filters.sort === 'most_viewed') {
      result.sort((a, b) => b.views - a.views);
    } else if (filters.sort === 'most_popular') {
      result.sort((a, b) => b.glims - a.glims);
    }

    setFilteredMedia(result);
  };

  useEffect(() => {
    applyFilters(activeFilters);
  }, []);

  return (
    <div className="pt-4 pb-8">
      <div className="px-4 pb-2">
        <EventHeader />
        <SearchBar
          isFilterPanelOpen={isFilterPanelOpen}
          setIsFilterPanelOpen={setIsFilterPanelOpen}
        />

        {isFilterPanelOpen && (
          <EventFilterPanel
            activeFilters={activeFilters}
            onApplyFilters={applyFilters}
            onClose={() => setIsFilterPanelOpen(false)}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 pt-3 px-4 bg-gray-100 w-full">
        {filteredMedia.map((image, index) => (
          <div key={index + image.author}>
            <PhotoCard
              key={index + image.author + 'card'}
              image={image}
              setIsMenuDisplayed={setIsMenuDisplayed}
              setAuthor={setAuthor}
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
            />
          </div>
        ))}
        {filteredMedia.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Aucun média ne correspond à vos critères de recherche.
          </div>
        )}
      </div>
      <div className="flex justify-center items-center pt-8">
        <Image
          src={'/favicon.ico'}
          alt={'logo glims'}
          width={50}
          height={50}
        />
      </div>
      {isMenuDiplayed && (
        <div className="fixed top-0 h-full w-full">
          <div
            className="w-full h-2/4"
            onClick={() => setIsMenuDisplayed(false)}></div>
          <div className="w-full h-2/4 bg-white rounded-t-2xl">
            <PhotoCardMenu author={author} />
          </div>
        </div>
      )}
      {selectedMedia.length > 0 && (
        <div className="fixed bottom-0 w-full bg-white rounded-t-2xl">
          <button
            onClick={() =>
              setIsMultiselectionMenuDisplayed(!isMultiselectionMenuDisplayed)
            }
            className={`w-full flex justify-between items-center py-3 px-4 font-bold text-gray-700 active:bg-gray-100`}>
            <p>{selectedMedia.length} photos sélectionnées </p>
            <MdKeyboardArrowDown
              size={23}
              className={`${!isMultiselectionMenuDisplayed && 'rotate-180'}`}
            />
          </button>
          {isMultiselectionMenuDisplayed && (
            <MultiSelectionMenu selectedMedia={selectedMedia} />
          )}
        </div>
      )}
    </div>
  );
}
