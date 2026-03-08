'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
import { ConfirmationModal } from '@/app/ui';
import { useDeleteMedia } from '@/hooks';

export type Picture = {
  id: string;
  /** data: URL for display, produced by the hook */
  url: string;
  contentType: string;
  user_id: string;
  folder_id: string;
  created_at: string;
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const deleteMedia = useDeleteMedia();

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
        return 'aspect-square';
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const extension = picture.contentType.split('/')[1] ?? 'jpg';
    const a = document.createElement('a');
    a.href = picture.url;
    a.download = `photo-${picture.id}.${extension}`;
    a.click();
    setIsMenuOpen(false);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Photo partagée depuis Glims',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // User cancelled or API unavailable — silent fail
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={picture.url}
        alt="Photo"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 cursor-pointer group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={picture.url}
                      alt="Photo"
                      className="absolute inset-0 w-full h-full object-cover"
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
                  onClick={handleDownload}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Download className="w-5 h-5" />
                  <span className="text-base">Télécharger</span>
                </button>

                <button
                  onClick={handleShare}
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
                    Toutes les photos de cet utilisateur
                  </span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick();
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

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer la photo"
        message="Êtes-vous sûr de vouloir supprimer cette photo ? Cette action est irréversible."
        confirmButtonText="Supprimer"
        cancelButtonText="Annuler"
        onConfirm={() => {
          deleteMedia.mutate([picture.id]);
        }}
        icon={<Trash2 size={48} />}
        position={isMobile ? 'bottom' : 'center'}
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </div>
  );
}
