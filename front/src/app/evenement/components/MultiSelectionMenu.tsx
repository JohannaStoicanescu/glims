import { GoShareAndroid } from 'react-icons/go';
import { Media } from '@/types/media';
import { LuTrash2 } from 'react-icons/lu';
import { TbFileAlert } from 'react-icons/tb';
import { BsDownload } from 'react-icons/bs';
import { IoIosStarOutline } from 'react-icons/io';
import { downloadMultipleImages, downloadSingleImage } from '@/utils';

interface MultiSelectionMenuProps {
  selectedMedias: Media[];
}

export default function MultiSelectionMenu({
  selectedMedias,
}: MultiSelectionMenuProps) {
  return (
    <div className="flex flex-col items-start w-full pb-6">
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <div className="flex justify-between w-full">
        <button className="w-full flex justify-center items-center text-gray-700 active:bg-gray-100">
          <IoIosStarOutline className="mr-2" />
          <p>Enregistrer</p>
        </button>
        <hr className="h-18 border-l-1 border-gray-200 w-0.5" />
        <button
          className="w-full flex justify-center items-center text-gray-700 active:bg-gray-100"
          onClick={() => {
            if (selectedMedias.length == 1) {
              downloadSingleImage(selectedMedias[0].src);
            } else {
              downloadMultipleImages(selectedMedias.map((media) => media.src));
            }
          }}>
          <BsDownload className="mr-2" />
          <p>Télécharger</p>
        </button>
      </div>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-gray-700 active:bg-gray-100 w-full rounded-t-3xl">
        <GoShareAndroid className="mr-2" />
        <p>Partager</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-red-500 active:bg-gray-100 w-full ">
        <LuTrash2 className="mr-2" />
        <p>Supprimer</p>
      </button>
      <hr className="h-0.5 border-t-1 border-gray-200 w-full" />
      <button className="flex items-center px-4 py-3 text-red-500 active:bg-gray-100 w-full ">
        <TbFileAlert className="mr-2" />
        <p>Signaler</p>
      </button>
    </div>
  );
}
