import Image from 'next/image';

interface UsersAvatarAndCountDisplayProps {
  users: Array<{
    id: string;
    profilePic: string;
  }>;
  numberOfUsersToShow: number;
}

export default function UsersAvatarAndCountDisplay({
  users,
  numberOfUsersToShow,
}: UsersAvatarAndCountDisplayProps) {
  const extraUsersCount = users.length - numberOfUsersToShow;
  return (
    <div className="flex items-center">
      {users.slice(0, numberOfUsersToShow).map((user, index) => (
        <div
          key={user.id + index}
          className={`rounded-full ${index > 0 ? '-ml-3 border-5 border-white' : ''}`}>
          <Image
            src={user.profilePic}
            alt="Photo de profil utilisateur"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      ))}
      {users.length > numberOfUsersToShow && (
        <div className="relative p-5 bg-gray-200 rounded-full -ml-3 border-5 border-white">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">{`+${extraUsersCount}`}</p>
        </div>
      )}
    </div>
  );
}
