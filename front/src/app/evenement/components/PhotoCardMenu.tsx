import { IoEyeOutline } from 'react-icons/io5';
import { IoIosStarOutline } from 'react-icons/io';
import { BsDownload } from 'react-icons/bs';
import { GoShareAndroid } from 'react-icons/go';
import { FiUsers } from 'react-icons/fi';
import { SlCamera } from 'react-icons/sl';
import { LuTrash2 } from 'react-icons/lu';
import { TbFileAlert } from 'react-icons/tb';
import { Media } from '@/types/media';

interface PhotoCardMenuProps {
  media: Media;
}

export default function PhotoCardMenu({ media }: PhotoCardMenuProps) {
  return (
    <div className="flex flex-col items-start w-full">
      <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full rounded-t-3xl">
        <IoEyeOutline className="mr-2" />
        <p>Voir la photo</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full">
        <IoIosStarOutline className="mr-2" />
        <p>Favori</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full">
        <BsDownload className="mr-2" />
        <p>Télécharger</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full">
        <GoShareAndroid className="mr-2" />
        <p>Partager</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full">
        <FiUsers className="mr-2" />
        <p>Personnes sur la photo</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full">
        <SlCamera className="mr-2" />
        <p>Toutes les photos de {media.author}</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-red-500 active:bg-gray-100 w-full">
        <LuTrash2 className="mr-2" />
        <p>Supprimer</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-red-500 active:bg-gray-100 w-full">
        <TbFileAlert className="mr-2" />
        <p>Signaler</p>
      </button>
    </div>
  );
}
