import Image from 'next/image';
import {
  MdKeyboardArrowLeft,
  MdOutlineStar,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsDownload } from 'react-icons/bs';
import { GoShareAndroid } from 'react-icons/go';

import { Media } from '@/types/media';
import { useState } from 'react';
import { downloadSingleImage } from '@/utils';

interface MediaDisplayProps {
  displayedMedia: Media;
  setContextMenuMedia: (value: Media | null) => void;
  setDisplayedMedia: (value: Media | null) => void;
}

export default function MediaDisplay({
  displayedMedia,
  setContextMenuMedia,
  setDisplayedMedia,
}: MediaDisplayProps) {
  const { src: imageUrl, author, liked, glims } = displayedMedia;
  const [isLiked, setIsLiked] = useState(liked);
  const [totalGlims, setTotalGlims] = useState(glims);

  const toggleLikeValue = () => {
    if (isLiked) setTotalGlims(totalGlims - 1);
    if (!isLiked) setTotalGlims(totalGlims + 1);

    setIsLiked((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-20 pt-10">
      <MdKeyboardArrowLeft
        size={26}
        className="text-white ml-4 mb-12 active:text-orange-200"
        onClick={() => {
          setDisplayedMedia(null);
          setContextMenuMedia(null);
        }}
      />
      <div className="flex justify-center">
        <div className="relative w-[92vw] h-[55vh] overflow-hidden rounded-lg text-white">
          <div className="absolute top-4 left-4 z-10">{author}</div>
          <button className="absolute top-4 right-4 z-10 active:text-orange-200">
            <RxHamburgerMenu
              size={20}
              onClick={() => setContextMenuMedia(displayedMedia)}
            />
          </button>

          <Image
            src={imageUrl}
            alt="image"
            fill
            className="object-cover scale-125"
            priority
          />

          <div className="absolute bottom-4 left-4 z-10 flex">
            <button
              className="flex items-center active:text-orange-200"
              onClick={() => {
                downloadSingleImage(imageUrl);
              }}
            >
              <BsDownload
                size={22}
                className="mr-2"
              />
              <p className="text-sm">Télécharger</p>
            </button>
            <button className="flex items-center active:text-orange-200">
              <GoShareAndroid
                size={24}
                className="ml-4 mr-2"
              />
              <p className="text-sm">Partager</p>
            </button>
          </div>

          <div className="absolute bottom-4 right-4 z-10 flex items-center">
            <button
              className="text-white active:text-orange-200"
              onClick={toggleLikeValue}>
              {isLiked ? (
                <MdOutlineStar className="w-7 h-7 delay-300 transition-all duration-300" />
              ) : (
                <MdOutlineStarBorder className="w-7 h-7 delay-300 transition-all duration-300" />
              )}
            </button>
            {totalGlims > 0 && <p className="text-white ml-1">{totalGlims}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
