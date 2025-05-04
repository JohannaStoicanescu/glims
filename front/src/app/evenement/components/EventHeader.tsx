import { HiDotsVertical } from 'react-icons/hi';
import { AvatarRounded } from '@/components/ui';

export default function EventHeader() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-2">
          <AvatarRounded
            src="/jeff.jpg"
            alt="1"
          />
          <AvatarRounded
            src="/diana.jpg"
            alt="2"
          />
          <div className="flex items-center">
            <div className="pl-4 text-center h-12 rounded-full bg-white flex items-center justify-center text-gray-500">
              +8 participants
            </div>
            <span className=""></span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium">Voyage au Ski !</h1>
          <p className="text-sm text-gray-500">5 mars 2025 · 5 photos</p>
        </div>
        <HiDotsVertical className="mx-4" />
      </div>
    </div>
  );
}
