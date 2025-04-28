import AlbumHeader from "./components/AlbumHeader";
import SearchBar from "./components/SearchBar";
import PhotoCard from "./components/PhotoCard";

export default function AlbumPage() {
  return (
    <div className="p-4 space-y-6">
      <AlbumHeader />
      <SearchBar />
      <div className="grid grid-cols-1 gap-4">
        <PhotoCard author="Celia" imageUrl="https://picsum.photos/720/480?random=1" />
        <PhotoCard author="Celia" imageUrl="https://picsum.photos/720/480?random=2" liked />
      </div>
    </div>
  );
}

