'use client';

import Image from 'next/image';
import { MdOutlineStarBorder } from 'react-icons/md';
import { MdOutlineStar } from 'react-icons/md';
import { RiCheckboxFill } from 'react-icons/ri';
import { RiCheckboxBlankLine } from 'react-icons/ri';
import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Media } from '@/types/media';

interface PhotoCardProps {
  image: Media;
  setIsMenuDisplayed: (value: boolean) => void;
  setIsMediaDisplayed: (value: boolean) => void;
  setAuthor: (value: string) => void;
  selectedMedias: Media[];
  setSelectedMedias: (value: Media[]) => void;
  setSelectedMedia: (value: Media) => void;
}

export default function PhotoCard({
  image,
  setIsMenuDisplayed,
  setAuthor,
  selectedMedias,
  setSelectedMedias,
  setSelectedMedia,
  setIsMediaDisplayed,
}: PhotoCardProps) {
  const { src: imageUrl, author, liked, glims } = image;
  const [isLiked, setIsLiked] = useState(liked);
  const [isChecked, setIsChecked] = useState(false);
  const [totalGlims, setTotalGlims] = useState(glims);

  const toggleLikeValue = () => {
    if (isLiked) setTotalGlims(totalGlims - 1);

    if (!isLiked) setTotalGlims(totalGlims + 1);

    setIsLiked((prev) => !prev);
    console.log(`Photo by ${author} is now ${!isLiked ? 'liked' : 'unliked'}`);
  };

  const handleCheckboxClick = () => {
    if (isChecked)
      setSelectedMedias(selectedMedias.filter((media) => media !== image));
    if (!isChecked) setSelectedMedias([...selectedMedias, image]);
    setIsChecked((prev) => !prev);
    // add logic to update the checkbox status in the backend
    console.log(
      `Photo by ${author} is now ${!isChecked ? 'checked' : 'unchecked'}`
    );
  };

  const handleMediaSelection = () => {
    setIsMediaDisplayed(true);
    setSelectedMedia(image);
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow transition-all duration-300">
      <Image
        src={imageUrl}
        alt={`Photo publiée ${author}`}
        width={720}
        height={480}
        className="w-full h-auto object-cover"
        onClick={handleMediaSelection}
      />
      <div className="absolute top-0 right-0 pt-2 pr-2">
        <HiDotsVertical
          className="text-white w-5 h-5"
          onClick={() => {
            setSelectedMedia(image);
          }}
        />
      </div>
      <div className="absolute top-0 left-0 pt-2 pl-2">
        <button
          className="text-blue-600"
          onClick={handleCheckboxClick}>
          {isChecked ? (
            <RiCheckboxFill className="w-7 h-7" />
          ) : (
            <RiCheckboxBlankLine className="w-7 h-7" />
          )}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 pb-4 pl-4">
        <p className="text-white text-sm">{author}</p>
      </div>
      <div className="absolute bottom-0 right-0 pb-2 pr-3 flex items-center">
        <button
          className="text-white"
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
  );
}
