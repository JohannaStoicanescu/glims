import Image from 'next/image';
import Link from 'next/link';

import UsersAvatarAndCountDisplay from '@/app/mes-glims/components/UsersAvatarAndCountDisplay';
import { Folder } from '@/types';

interface GlimsDisplayProps {
  glims: Folder[];
}

export default function GlimsDisplay({ glims }: GlimsDisplayProps) {
  // TODO: get glims users from API
  const glimsUsers = [
    { id: '1', profilePic: 'https://picsum.photos/200/200' },
    { id: '2', profilePic: 'https://picsum.photos/200/200' },
    { id: '3', profilePic: 'https://picsum.photos/200/200' },
    { id: '4', profilePic: 'https://picsum.photos/200/200' },
    { id: '5', name: 'John Doe', profilePic: 'https://picsum.photos/200/200' },
    { id: '6', profilePic: 'https://picsum.photos/200/200' },
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto pb-10">
        <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {glims.map((glim, index) => {
            return (
              <Link
                href={`/mes-glims/${glim.id}`}
                key={glim.id + index}
                className="rounded-3xl cursor-pointer group">
                <div className="w-full h-56 overflow-hidden rounded-lg">
                  {glim.thumbnail_url ? (
                    <Image
                      alt="Glims image"
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      src={glim.thumbnail_url}
                      width={640}
                      height={480}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Aucune photo</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col py-2 rounded-b-2xl">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl transition-colors duration-300 ease-in-out group-hover:text-orange-600">
                      {glim.title}
                    </h3>
                    <UsersAvatarAndCountDisplay
                      users={glimsUsers}
                      numberOfUsersToShow={2}
                    />
                  </div>
                  <div className="flex">
                    <p className="text-gray-800 pr-3">
                      {glim.media_count != null ? `${glim.media_count} photos` : ''}
                    </p>
                    {glim.createdAt && (
                      <p className="text-gray-400">
                        {new Date(glim.createdAt).toLocaleDateString('fr-FR', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    )}
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
