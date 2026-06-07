import Image from 'next/image';
import { User } from 'lucide-react';

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
  const hasImage = avatar && !avatar.includes('martin-luther-king.jpg');

  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <div
        className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ${
          hasImage ? '' : 'bg-red-50 border border-red-100'
        }`}>
        {hasImage ? (
          <div className="relative w-full h-full">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <User
            size={24}
            className="text-orange-600"
          />
        )}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
}
