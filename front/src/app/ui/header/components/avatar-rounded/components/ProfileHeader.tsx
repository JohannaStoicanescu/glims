import Image from 'next/image';

interface ProfileHeaderProps {
  avatar: string;
  name: string;
  email: string;
}

export default function ProfileHeader({
  avatar,
  name,
  email,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={avatar}
          alt={`Photo de profil de ${name}`}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
}
