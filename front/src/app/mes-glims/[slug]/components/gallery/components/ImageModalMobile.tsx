'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  X,
  Heart,
  Download,
  Share2,
  Users,
  Camera,
  Trash2,
  AlertCircle,
  EllipsisVertical,
  Plus,
} from '@/components/ui/icons';
import { ConfirmationModal, ReactionPicker } from '@/components';
import { Picture } from '.';
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
  availableReactions?: { id: string; name: string; svg: string }[];
}

export default function ImageModalMobile({
  picture,
  isLoaded,
  onClose,
  onImageLoad,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  formatDate,
  availableReactions = [],
}: Omit<
  ImageModalMobileProps,
  'pictures' | 'currentIndex' | 'onNavigate' | 'onResetLoad'
>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReactionPickerOpen, setIsReactionPickerOpen] = useState(false);
  const deleteMedia = useDeleteMedia();
  const { data: author } = useGetUserById(picture.user_id);

  // Group reactions by type for display
  const reactionStats = useMemo(() => {
    if (!picture.reactions) return [];
    const stats: Record<string, { svg: string; count: number; name: string }> =
      {};
    picture.reactions.forEach((r) => {
      if (!stats[r.reaction_type.id]) {
        stats[r.reaction_type.id] = {
          svg: r.reaction_type.svg,
          count: 0,
          name: r.reaction_type.name,
        };
      }
      stats[r.reaction_type.id].count++;
    });
    return Object.values(stats);
  }, [picture.reactions]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = picture.url;
    a.download = `photo-${picture.id}.jpg`;
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
      // User cancelled or API unavailable
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col h-full overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {author?.name.charAt(0).toUpperCase() ?? '?'}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              {author?.name ?? 'Utilisateur'}
            </p>
            <p className="text-gray-400 text-xs">{formatDate()}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* MAIN IMAGE WITH GESTURES */}
      <div
        className="flex-1 relative flex items-center justify-center w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <Image
          src={picture.url}
          alt={`Photo by author`}
          fill
          className={`object-contain transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={onImageLoad}
          priority
        />
        {!isLoaded && (
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-lg animate-spin" />
        )}
      </div>

      {/* FOOTER ACTIONS AND REACTIONS */}
      <div className="p-4 space-y-4 bg-gradient-to-t from-black/80 to-transparent">
        {/* REACTIONS DISPLAY */}
        <div className="flex flex-wrap items-center gap-2">
          {reactionStats.map((stat) => (
            <div
              key={stat.name}
              className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-white">
              <div
                className="w-5 h-5"
                dangerouslySetInnerHTML={{ __html: stat.svg }}
              />
              <span className="text-sm font-bold">{stat.count}</span>
            </div>
          ))}
          {availableReactions.length > 0 && (
            <button
              onClick={() => setIsReactionPickerOpen(true)}
              className="w-10 h-10 bg-white/10 active:bg-orange-500 rounded-full flex items-center justify-center transition-all border border-white/10 ml-1"
              aria-label="Réagir">
              <Plus className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {/* TOOLBAR */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-white active:text-red-500">
              <Heart className="w-6 h-6" />
            </button>
            <button
              onClick={handleShare}
              className="text-white active:text-orange-500">
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={handleDownload}
              className="text-white active:text-orange-500">
              <Download className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white active:text-orange-500">
            <EllipsisVertical className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* OPTIONS BOTTOM SHEET */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 z-[70] animate-slide-up">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <div className="space-y-1">
              <button className="w-full flex items-center gap-4 py-4 text-gray-700">
                <Users className="w-6 h-6" />
                <span className="text-lg font-medium">
                  Personnes sur la photo
                </span>
              </button>
              <button className="w-full flex items-center gap-4 py-4 text-gray-700">
                <Camera className="w-6 h-6" />
                <span className="text-lg font-medium">
                  Toutes les photos de l&apos;auteur
                </span>
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-full flex items-center gap-4 py-4 text-red-500">
                <Trash2 className="w-6 h-6" />
                <span className="text-lg font-medium">Supprimer</span>
              </button>
              <button className="w-full flex items-center gap-4 py-4 text-red-500">
                <AlertCircle className="w-6 h-6" />
                <span className="text-lg font-medium">Signaler</span>
              </button>
            </div>
          </div>
        </>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer la photo"
        message="Êtes-vous sûr de vouloir supprimer cette photo ?"
        confirmButtonText="Supprimer"
        cancelButtonText="Annuler"
        onConfirm={() => {
          deleteMedia.mutate([picture.id], {
            onSuccess: () => {
              onClose();
            },
          });
        }}
        icon={<Trash2 size={48} />}
        position="bottom"
      />

      <ReactionPicker
        isOpen={isReactionPickerOpen}
        onClose={() => setIsReactionPickerOpen(false)}
        mediaId={picture.id}
        availableReactions={availableReactions}
      />
    </div>
  );
}
