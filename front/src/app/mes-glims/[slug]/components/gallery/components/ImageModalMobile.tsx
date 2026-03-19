'use client';

import { createPortal } from 'react-dom';
import { useRef, useState } from 'react';
import Image from 'next/image';

import { Picture } from '.';
import {
  ChevronLeft,
  Heart,
  Download,
  EllipsisVertical,
  Users,
  Camera,
  Pencil,
  Trash2,
  AlertCircle,
  Share2,
} from '@/components/ui/icons';
import { ConfirmationModal } from '@/components';
import { useDeleteMedia, useGetUserById } from '@/hooks';

interface ImageModalMobileProps {
  picture: Picture;
  pictures: Picture[];
  currentIndex: number;
  isLoaded: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onImageLoad: () => void;
  onResetLoad: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  formatDate: () => string;
}

export default function ImageModalMobile({
  picture,
  pictures,
  currentIndex,
  isLoaded,
  onClose,
  onNavigate,
  onImageLoad,
  onResetLoad,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  formatDate,
}: ImageModalMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteMedia = useDeleteMedia();
  const { data: author } = useGetUserById(picture.user_id);

  // Get other images (excluding the current image)
  const otherPictures = pictures.filter((_, index) => index !== currentIndex);

  const handleImageClick = (originalIndex: number) => {
    onResetLoad();
    onNavigate(originalIndex);
    // Scroll to the top
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to download the image
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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsOptionsMenuOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto"
      onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-10">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Retour">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={() => setIsOptionsMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Plus d'options">
          <EllipsisVertical className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/*
        We use createPortal to render the menu outside the normal React tree (directly into document.body),
        so it can visually overlay the rest of the app and avoid CSS stacking/context issues.
      */}
      {isOptionsMenuOpen &&
        createPortal(
          <>
            {/* OVERLAY FOR CLOSING THE MENU */}
            <div
              className="fixed inset-0 bg-black/50 z-[9998]"
              onClick={() => setIsOptionsMenuOpen(false)}
            />

            {/* BOTTOM SHEET MENU */}
            <div
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-[9999]"
              onClick={(e) => e.stopPropagation()}>
              <div className="px-4 py-6 pb-8">
                <button
                  onClick={() => {
                    // TODO: People in the photo
                    setIsOptionsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Users className="w-5 h-5" />
                  <span className="text-base">Personnes sur la photo</span>
                </button>

                <button
                  onClick={() => {
                    // TODO: All photos by the author
                    setIsOptionsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Camera className="w-5 h-5" />
                  <span className="text-base">
                    Toutes les photos de cet utilisateur
                  </span>
                </button>

                <button
                  onClick={() => {
                    // TODO: Edit
                    setIsOptionsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Pencil className="w-5 h-5" />
                  <span className="text-base">Editer</span>
                </button>

                <button
                  onClick={handleDeleteClick}
                  className="w-full flex items-center gap-4 px-3 py-3 cursor-pointer rounded-lg hover:bg-red-50 transition-colors text-red-500">
                  <Trash2 className="w-5 h-5" />
                  <span className="text-base">Supprimer</span>
                </button>

                <button
                  onClick={() => {
                    // TODO: Report
                    setIsOptionsMenuOpen(false);
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
          onClose(); // On ferme la modale d'image après suppression
        }}
        icon={<Trash2 size={48} />}
        position="bottom"
      />

      {/* MAIN IMAGE DISPLAY */}
      <div
        className="relative w-full px-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={picture.url}
            alt={`Photo by ${author?.name ?? 'unknown'}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={onImageLoad}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button
          className="w-10 h-10 border border-gray-200 rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Ajouter aux favoris">
          <Heart className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          aria-label="Télécharger">
          <Download className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700 font-medium text-sm">Télécharger</span>
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          aria-label="Partager">
          <Share2 className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700 font-medium text-sm">Partager</span>
        </button>
      </div>

      {/* AUTHOR INFOS */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {author?.name.charAt(0).toUpperCase() ?? '?'}
          </span>
        </div>
        <div>
          <p className="text-gray-900 font-medium text-sm">
            {author?.name ?? 'Utilisateur'}
          </p>
          <p className="text-gray-500 text-xs">{formatDate()}</p>
        </div>
      </div>

      {/* OTHER PICTURES */}
      {otherPictures.length > 0 && (
        <>
          <div className="mx-4 border-t border-gray-200 my-2" />
          <div className="px-4 py-3">
            <p className="text-gray-500 text-sm mb-3">
              Autres contenus du Glims
            </p>
            <div className="grid grid-cols-2 gap-2">
              {otherPictures.map((pic, idx) => {
                const originalIndex = pictures.findIndex(
                  (p) => p.id === pic.id
                );
                return (
                  <button
                    key={pic.id}
                    onClick={() => handleImageClick(originalIndex)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                    <Image
                      src={pic.url}
                      alt={`Photo ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 w-8 h-8 bg-black/40 rounded-lg flex items-center justify-center opacity-80 cursor-pointer hover:bg-white/30">
                      <EllipsisVertical className="w-4 h-4 text-white" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* SPACE FOR SCROLL */}
      <div className="h-8" />
    </div>
  );
}
