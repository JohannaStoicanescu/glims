'use client';

import { RxCross2 } from 'react-icons/rx';
import { LuArrowUpWideNarrow } from 'react-icons/lu';
import { RiShapesLine } from 'react-icons/ri';
import { LuCalendarRange } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

interface EventFilterPanelProps {
  initialImageList: {
    src: string;
    author: string;
    liked: boolean;
    vue: number;
    glims: number;
  }[];
  imageList: [];
  setImageList: (
    imageList: {
      src: string;
      author: string;
      liked: boolean;
      vue: number;
      glims: number;
    }[]
  ) => void;
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: (isOpen: boolean) => void;
}

export default function EventFilterPanel({
  initialImageList,
  imageList,
  setImageList,
  isFilterPanelOpen,
  setIsFilterPanelOpen,
}: EventFilterPanelProps) {
  const [isLastPhoto, setIsLastPhoto] = useState(true);
  const [isMostViewed, setIsMostViewed] = useState(false);
  const [isMostGlimsed, setIsMostGlimsed] = useState(false);

  const [isAll, setIsAll] = useState(true);
  const [isPhoto, setIsPhoto] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const [isAllDate, setIsAllDate] = useState(true);
  const [isLast24h, setIsLast24h] = useState(false);

  const handleFilterSelection = () => {};

  return (
    <div className="font-medium w-full py-2">
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-700">Filtres</p>
        <div className="flex items-center">
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg">
            Réinitialiser
          </button>
          <RxCross2
            size={22}
            className="m-4"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          />
        </div>
      </div>
      <hr className="my-1 h-0.5 border-t-1 border-gray-200" />
      <div>
        <div className="flex items-center text-gray-700 my-3">
          <LuArrowUpWideNarrow className="ml-4 mr-2" />
          <p className="text-lg">Trier par</p>
        </div>
        <div>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Dernière publications
          </button>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Les plus vues
          </button>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Les plus populaires
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center text-gray-700 my-3">
          <RiShapesLine className="ml-4 mr-2" />
          <p className="text-gray-700 text-lg">Type de fichier</p>
        </div>
        <div>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Tout
          </button>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Photos
          </button>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Vidéos
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center text-gray-700 my-3">
          <LuCalendarRange className="ml-4 mr-2" />
          <p className="text-lg">Date de chargement</p>
        </div>
        <div>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Tout les photos
          </button>
          <button className="border-1 border-gray-200 rounded-lg py-1 px-3 text-gray-500 text-lg mr-2 mb-2">
            Dernières 24h
          </button>
        </div>
      </div>
      <button
        onClick={() => handleFilterSelection()}
        className="flex justify-center items-center w-full bg-gray-800 text-white py-3 my-4 rounded-xl">
        <p className="mr-3">Continuer</p>
        <IoIosArrowForward />
      </button>
    </div>
  );
}
