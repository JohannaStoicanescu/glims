import { AvatarRounded } from "@/components/ui";

export default function AlbumHeader() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-2">
          <AvatarRounded
            src="https://picsum.photos/200/200?random=1"
            alt="1"
          />
          <AvatarRounded
            src="https://picsum.photos/200/200?random=2"
            alt="2"
          />
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
            +3
          </div>
        </div>
        <span className="text-sm text-gray-500">participants</span>
      </div>

      <div>
        <h1 className="text-xl font-semibold">Mariage Cindy et Kevin</h1>
        <p className="text-sm text-gray-500">7 mars 2025 · 150 photos</p>
      </div>
    </div>
  );
}
