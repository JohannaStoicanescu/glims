'use client';

import { ChevronLeft, ChevronRight, Minimize2 } from '@/app/ui/icons';
import { Picture } from '.';

interface ImageModalExpandedProps {
  picture: Picture;
  pictures: Picture[];
  currentIndex: number;
  isLoaded: boolean;
  onImageLoad: () => void;
  onToggleExpanded: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export default function ImageModalExpanded({
  picture,
  pictures,
  currentIndex,
  isLoaded,
  onImageLoad,
  onToggleExpanded,
  onPrevious,
  onNext,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: ImageModalExpandedProps) {
  return (
    // FULLSCREEN MODAL CONTAINER
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}>
      <div className="w-full h-full flex items-center justify-between px-4">
        {/* LEFT ARROW BUTTON */}
        <div className="flex-shrink-0 w-16 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            disabled={currentIndex === 0}
            className={`w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'opacity-100'
            }`}
            aria-label="Image précédente">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* MAIN IMAGE DISPLAY */}
        <div
          className="flex-1 h-full flex items-center justify-center py-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}>
          <div className="relative inline-block max-w-full max-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={picture.url}
              alt="Photo"
              className={`max-w-full max-h-[95vh] w-auto h-auto object-contain transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={onImageLoad}
            />
            {/* LOADING SPINNER */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* EXIT FULLSCREEN BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpanded();
              }}
              className="absolute bottom-3 right-3 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors z-20 cursor-pointer"
              aria-label="Quitter le plein écran">
              <Minimize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* RIGHT ARROW BUTTON */}
        <div className="flex-shrink-0 w-16 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={currentIndex === pictures.length - 1}
            className={`w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              currentIndex === pictures.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'opacity-100'
            }`}
            aria-label="Image suivante">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
