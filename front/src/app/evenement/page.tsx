'use client';

import EventHeader from './components/EventHeader';
import SearchBar from './components/SearchBar';
import PhotoCard from './components/PhotoCard';
import EventFilterPanel from './components/EventFilterPanel';
import { useEffect, useState } from 'react';
import { Media } from '@/types/media';

export default function AlbumPage() {
  // TODO: fetch media from API
  const allMedia: Media[] = [
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Jack',
      liked: true,
      views: 5,
      glims: 2,
      date: '2025-01-01T12:00:00Z',
      type: 'photo',
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Célia',
      liked: false,
      views: 2,
      glims: 0,
      date: '2025-01-02T12:00:00Z',
      type: 'photo',
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Morgane',
      liked: false,
      views: 10,
      glims: 6,
      date: '2025-01-03T12:00:00Z',
      type: 'photo',
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Samih',
      liked: true,
      views: 11,
      glims: 4,
      date: new Date().toISOString(),
      type: 'photo',
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Yasmine',
      liked: true,
      views: 7,
      glims: 2,
      date: '2025-05-04T12:00:00Z',
      type: 'photo',
    },
  ];

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filteredMedia, setFilteredMedia] = useState(allMedia);
  const [activeFilters, setActiveFilters] = useState({
    sort: 'none',
    type: 'none',
    date: 'none',
  });

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
    <>
      <div className="px-4 pt-4 pb-2">
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
          <PhotoCard
            key={index + image.author}
            author={image.author}
            imageUrl={image.src}
            liked={image.liked}
            glims={image.glims}
          />
        ))}
        {filteredMedia.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Aucun média ne correspond à vos critères de recherche.
          </div>
        )}
      </div>
    </>
  );
}
