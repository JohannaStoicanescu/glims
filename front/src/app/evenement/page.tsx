'use client';

import EventHeader from './components/EventHeader';
import SearchBar from './components/SearchBar';
import PhotoCard from './components/PhotoCard';
import EventFilterPanel from './components/EventFilterPanel';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';

export default function AlbumPage() {
  // TODO: fetch images from API

  const initialImageList = [
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Jack',
      liked: true,
      vue: 5,
      glims: 2,
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Célia',
      liked: false,
      vue: 2,
      glims: 0,
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Morgane',
      liked: false,
      vue: 10,
      glims: 6,
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Samih',
      liked: true,
      vue: 11,
      glims: 4,
    },
    {
      src: 'https://picsum.photos/720/480?random=1',
      author: 'Yasmine',
      liked: true,
      vue: 7,
      glims: 2,
    },
  ];

  const [imageList, setImageList] = useState<
    {
      src: string;
      author: string;
      liked: boolean;
      vue: number;
      glims: number;
    }[]
  >(initialImageList);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

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
            initialImageList={initialImageList}
            imageList={imageList}
            setImageList={setImageList}
            isFilterPanelOpen={isFilterPanelOpen}
            setIsFilterPanelOpen={setIsFilterPanelOpen}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 pt-3 px-4 bg-gray-100 w-full">
        {initialImageList.map((image, index) => (
          <PhotoCard
            key={index}
            author={image.author}
            imageUrl={image.src}
            liked={image.liked}
            glims={image.glims}
          />
        ))}
      </div>
    </>
  );
}
