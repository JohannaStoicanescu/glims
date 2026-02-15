'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import {
  EllipsisVertical,
  ZoomIn,
  Download,
  Share2,
  Users,
  Camera,
  Trash2,
  AlertCircle,
  Heart,
} from '@/app/ui/icons';

export type Picture = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

interface GalleryImageProps {
  picture: Picture;
  aspectRatio?: 'auto' | 'square' | 'landscape' | 'portrait';
  className?: string;
  onClick?: () => void;
}

export default function GalleryImage({
  picture,
  aspectRatio = 'auto',
  className = '',
  onClick,
}: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Detect if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate the menu position when it opens (desktop only)
  useEffect(() => {
    if (isMenuOpen && buttonRef.current && !isMobile) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 280, // 280 = min-w du menu
      });
    }
  }, [isMenuOpen, isMobile]);

  // Close the menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'landscape':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return '';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg group cursor-pointer ${getAspectRatioClass()} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}>
      <Image
        src={picture.download_url}
        alt={`Photo by ${picture.author}`}
        fill={aspectRatio !== 'auto'}
        width={aspectRatio === 'auto' ? picture.width : undefined}
        height={aspectRatio === 'auto' ? picture.height : undefined}
        className={`object-cover transition-all duration-300 cursor-pointer group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${aspectRatio === 'auto' ? 'w-full h-auto' : ''}`}
        onLoad={() => setIsLoaded(true)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* OPTIONS BUTTON - TOP RIGHT */}
      <div className="absolute top-2 right-2 z-20">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className={`w-10 h-10 bg-black/80 hover:bg-black/40 shadow-lg shadow-white/20 cursor-pointer rounded-lg flex items-center justify-center transition-colors z-10 ${
            isMenuOpen
              ? 'opacity-100'
              : 'md:opacity-0 md:group-hover:opacity-100'
          }`}
          aria-label="Plus d'options">
          <EllipsisVertical className="w-5 h-5 text-white" />
        </button>
      </div>

      {/*
        We use createPortal to render the menu outside the normal React tree (directly into document.body),
        so it can visually overlay the rest of the app and avoid CSS stacking/context issues.
      */}
      {isMenuOpen &&
        createPortal(
          <>
            {/* OVERLAY - BLACK BACKGROUND */}
            {isMobile && (
              <div
                className="fixed inset-0 bg-black/90 z-[9998]"
                onClick={() => setIsMenuOpen(false)}
              />
            )}

            <div
              ref={menuRef}
              className={`fixed bg-white shadow-xl z-[9999] ${
                isMobile
                  ? 'inset-x-0 bottom-0 rounded-t-3xl pt-16'
                  : 'rounded-2xl p-2 min-w-[280px]'
              }`}
              style={
                isMobile
                  ? undefined
                  : { top: menuPosition.top, left: menuPosition.left }
              }
              onClick={(e) => e.stopPropagation()}>
              {/* MOBILE VERSION - image overflowing at the top */}
              {isMobile && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-36">
                  <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                    <Image
                      src={picture.download_url}
                      alt={`Photo by ${picture.author}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className={isMobile ? 'px-4 pb-8' : ''}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <ZoomIn className="w-5 h-5" />
                  <span className="text-base">Voir la photo</span>
                </button>

                {/* ADD TO FAVORITES */}
                {isMobile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Ajouter en favori
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                    <Heart className="w-5 h-5" />
                    <span className="text-base">Ajouter en favori</span>
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Télécharger
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Download className="w-5 h-5" />
                  <span className="text-base">Télécharger</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Partager
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Share2 className="w-5 h-5" />
                  <span className="text-base">Partager</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Personnes sur la photo
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Users className="w-5 h-5" />
                  <span className="text-base">Personnes sur la photo</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Toutes les photos de l'auteur
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Camera className="w-5 h-5" />
                  <span className="text-base">
                    Toutes les photos de {picture.author}
                  </span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Supprimer
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-red-50 transition-colors text-red-500">
                  <Trash2 className="w-5 h-5" />
                  <span className="text-base">Supprimer</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Signaler
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-red-50 transition-colors text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-base">Signaler</span>
                </button>
              </div>
            </div>
          </>,
          document.body
        )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-medium truncate">
          {picture.author}
        </p>
      </div>
    </div>
  );
}
