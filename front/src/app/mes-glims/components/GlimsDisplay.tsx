import Image from 'next/image';
import Link from 'next/link';

import UsersAvatarAndCountDisplay from '@/app/mes-glims/components/UsersAvatarAndCountDisplay';

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
  // TODO: get glims users from API
  const glimsUsers = [
    {
      id: '1',
      profilePic: 'https://picsum.photos/200/200',
    },
    {
      id: '2',
      profilePic: 'https://picsum.photos/200/200',
    },
    {
      id: '3',
      profilePic: 'https://picsum.photos/200/200',
    },
    {
      id: '4',
      profilePic: 'https://picsum.photos/200/200',
    },
    {
      id: '5',
      name: 'John Doe',
      profilePic: 'https://picsum.photos/200/200',
    },
    {
      id: '6',
      profilePic: 'https://picsum.photos/200/200',
    },
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto pb-10">
        <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
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
                <div className="flex flex-col py-2 rounded-b-2xl">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl transition-colors duration-300 ease-in-out group-hover:text-orange-600">
                      Glims Title Test
                    </h3>
                    <UsersAvatarAndCountDisplay
                      users={glimsUsers}
                      numberOfUsersToShow={2}
                    />
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
