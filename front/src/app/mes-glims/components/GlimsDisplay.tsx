import Image from 'next/image';
import Link from 'next/link';

interface GlimsDisplayProps {
  glims: Array<{
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  }>;
}

//TODO: fetch glims data from API instead of passing as props and replace the prop usage
export default function GlimsDisplay({ glims }: GlimsDisplayProps) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {glims.map((glim, index) => {
            return (
              <Link
                // TODO: use glims label instead of author
                href={`/mes-glims/${glim.author}`}
                key={glim.id + index}
                className="rounded-3xl cursor-pointer group">
                <div className="w-full h-56 overflow-hidden rounded-lg">
                  <Image
                    alt="Glims image"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={glim.download_url}
                    width={640}
                    height={480}
                  />
                </div>
                <div className="flex flex-col pt-4 pb-2 px-3 rounded-b-2xl transition-colors duration-300 ease-in-out group-hover:text-orange-600">
                  <div className="flex flex-1 justify-between pb-2">
                    <h3 className="font-bold text-xl">Glims Title Test</h3>
                    <div className="p-4 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="flex">
                    <p className="text-gray-800 pr-3">8 photos</p>
                    <p className="text-gray-400">il y a 2 mois</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
