import { Media } from '@/types/media';
import { BsDownload } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { GoShareAndroid } from 'react-icons/go';
import { IoIosStarOutline } from 'react-icons/io';
import { LuTrash2 } from 'react-icons/lu';
import { SlCamera } from 'react-icons/sl';
import { TbFileAlert } from 'react-icons/tb';
import { PiMagicWand } from 'react-icons/pi';
import { downloadSingleImage } from '@/utils';

interface MediaDisplayMenuProps {
  contextMenuMedia: Media;
  setContextMenuMedia: (value: Media | null) => void;
}

export default function MediaDisplayMenu({
  contextMenuMedia,
  setContextMenuMedia,
}: MediaDisplayMenuProps) {
  const { src: imageUrl, author } = contextMenuMedia;

  return (
    <div className="fixed bottom-0 w-full h-full">
      <div
        className="w-full h-[58vh]"
        onClick={() => setContextMenuMedia(null)}></div>
      <div className="w-full h-[42vh] bg-white rounded-t-2xl">
        <div className="flex justify-between w-full">
          <button className="w-full flex justify-center items-center text-gray-700 active:bg-gray-100">
            <IoIosStarOutline className="mr-2" />
            <p>Enregistrer</p>
          </button>
          <hr className="h-18 border-l-1 border-gray-200 w-0.5" />
          <button
            className="w-full flex justify-center items-center text-gray-700 active:bg-gray-100"
            onClick={() => {
              downloadSingleImage(imageUrl);
            }}>
            <BsDownload className="mr-2" />
            <p>Télécharger</p>
          </button>
        </div>
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
          <p>Toutes les photos de {author}</p>
        </button>
        <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
        <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full">
          <PiMagicWand className="mr-2" />
          <p>Editer</p>
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
    </div>
  );
}
