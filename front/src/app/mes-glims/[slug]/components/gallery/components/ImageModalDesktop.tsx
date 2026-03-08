'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Download,
  EllipsisVertical,
  Upload,
  Maximize2,
  Users,
  Camera,
  Pencil,
  Trash2,
  AlertCircle,
} from '@/app/ui/icons';
import { ConfirmationModal } from '@/app/ui';
import { Picture } from '.';
import { useDeleteMedia } from '@/hooks';

interface ImageModalDesktopProps {
  picture: Picture;
  pictures: Picture[];
  currentIndex: number;
  isLoaded: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onImageLoad: () => void;
  onResetLoad: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleExpanded: () => void;
  formatDate: () => string;
}

export default function ImageModalDesktop({
  picture,
  pictures,
  currentIndex,
  isLoaded,
  onClose,
  onNavigate,
  onImageLoad,
  onResetLoad,
  onPrevious,
  onNext,
  onToggleExpanded,
  formatDate,
}: ImageModalDesktopProps) {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const optionsButtonRef = useRef<HTMLButtonElement>(null);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const deleteMedia = useDeleteMedia();

  // Automatic scroll to the selected thumbnail
  useEffect(() => {
    if (thumbnailRefs.current[currentIndex] && thumbnailsContainerRef.current) {
      const thumbnail = thumbnailRefs.current[currentIndex];
      const container = thumbnailsContainerRef.current;

      if (thumbnail) {
        const thumbnailLeft = thumbnail.offsetLeft;
        const thumbnailWidth = thumbnail.offsetWidth;
        const containerWidth = container.offsetWidth;

        // Center the thumbnail in the container
        const scrollPosition =
          thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex]);

  // Handle image download
  const handleDownload = async () => {
    try {
      const response = await fetch(picture.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `photo-${picture.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  // Calculate and set the position of the options menu when it opens
  useEffect(() => {
    if (isOptionsMenuOpen && optionsButtonRef.current) {
      const rect = optionsButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top - 8, // Au-dessus du bouton
        left: rect.right - 280, // Aligné à droite
      });
    }
  }, [isOptionsMenuOpen]);

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target as Node) &&
        optionsButtonRef.current &&
        !optionsButtonRef.current.contains(event.target as Node)
      ) {
        setIsOptionsMenuOpen(false);
      }
    };

    if (isOptionsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOptionsMenuOpen]);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsOptionsMenuOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}>
      {/* CLOSE BUTTON */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onClose}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 cursor-pointer rounded-lg flex items-center justify-center transition-colors"
          aria-label="Fermer">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div
        className="flex-1 flex items-center justify-center p-8 gap-4"
        onClick={(e) => e.stopPropagation()}>
        {/* GO BACK */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`absolute left-4 lg:left-8 w-12 h-12 bg-white/30 hover:bg-white/50 cursor-pointer rounded-lg flex items-center justify-center transition-all ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
          }`}
          aria-label="Image précédente">
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <div className="flex flex-col items-center justify-center max-w-4xl lg:max-w-5xl w-full h-full">
          {/* MAIN IMAGE */}
          <div className="relative flex-1 w-full flex items-center justify-center min-h-0">
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={picture.url}
                alt="Photo"
                className={`max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={onImageLoad}
              />
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-lg animate-spin" />
                </div>
              )}

              {/* FULLSCREEN BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpanded();
                }}
                className="absolute bottom-3 right-3 w-10 h-10 bg-white/10 hover:bg-white/20 cursor-pointer rounded-lg flex items-center justify-center transition-colors z-20"
                aria-label="Plein écran">
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* GO FORWARD */}
        <button
          onClick={onNext}
          disabled={currentIndex === pictures.length - 1}
          className={`absolute right-4 lg:right-8 w-12 h-12 bg-white/30 hover:bg-white/50 cursor-pointer rounded-lg flex items-center justify-center transition-all ${
            currentIndex === pictures.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-100'
          }`}
          aria-label="Image suivante">
          <ChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* IMAGE INFO */}
      <div
        className="flex items-center justify-between px-8 py-4 bg-gradient-to-t from-black/50 to-transparent"
        onClick={(e) => e.stopPropagation()}>
        {/* AUTHOR INFO */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {'?'}
            </span>
          </div>
          <div>
            <p className="text-white font-medium">Utilisateur</p>
            <p className="text-gray-400 text-sm">{formatDate()}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <button
            className="w-12 h-12 bg-white/10 hover:bg-white/20 cursor-pointer rounded-lg flex items-center justify-center transition-colors"
            aria-label="Ajouter aux favoris">
            <Heart className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleDownload}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 cursor-pointer rounded-lg flex items-center justify-center transition-colors"
            aria-label="Télécharger">
            <Download className="w-5 h-5 text-white" />
          </button>
          <button
            className="w-12 h-12 bg-white/10 hover:bg-white/20 cursor-pointer rounded-lg flex items-center justify-center transition-colors"
            aria-label="Partager">
            <Upload className="w-5 h-5 text-white" />
          </button>
          <button
            ref={optionsButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsOptionsMenuOpen(!isOptionsMenuOpen);
            }}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 cursor-pointer rounded-lg flex items-center justify-center transition-colors"
            aria-label="Plus d'options">
            <EllipsisVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/*
        We use createPortal to render the menu outside the normal React tree (directly into document.body),
        so it can visually overlay the rest of the app and avoid CSS stacking/context issues.
      */}
      {isOptionsMenuOpen &&
        createPortal(
          <div
            ref={optionsMenuRef}
            className="fixed bg-white rounded-2xl shadow-xl p-2 min-w-[280px] z-[9999]"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              transform: 'translateY(-100%)',
            }}
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Personnes sur la photo
                setIsOptionsMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
              <Users className="w-5 h-5" />
              <span className="text-base">Personnes sur la photo</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Toutes les photos de l'auteur
                setIsOptionsMenuOpen(false);
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
                // TODO: Editer
                setIsOptionsMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
              <Pencil className="w-5 h-5" />
              <span className="text-base">Editer</span>
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
                setIsOptionsMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-red-50 transition-colors text-red-500">
              <AlertCircle className="w-5 h-5" />
              <span className="text-base">Signaler</span>
            </button>
          </div>,
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
          onClose(); // On ferme la modale d'image après suppression
        }}
        icon={<Trash2 size={48} />}
      />

      {/* THUMBNAILS AT THE BOTTOM */}
      <div
        className="px-8 pb-4"
        onClick={(e) => e.stopPropagation()}>
        <div
          ref={thumbnailsContainerRef}
          className="flex gap-2 justify-start overflow-x-auto py-2 scrollbar-hide">
          {pictures.map((pic, idx) => (
            <button
              key={pic.id}
              ref={(el) => {
                thumbnailRefs.current[idx] = el;
              }}
              onClick={(e) => {
                e.stopPropagation();
                onResetLoad();
                onNavigate(idx);
              }}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg cursor-pointer overflow-hidden transition-all ${
                idx === currentIndex
                  ? 'ring-2 ring-white scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pic.url}
                alt={`Miniature ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
