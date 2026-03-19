'use client';

import { useEffect, useState, useCallback } from 'react';

import {
  ImageModalDesktop,
  ImageModalExpanded,
  ImageModalMobile,
  Picture,
} from '.';

interface ImageModalProps {
  picture: Picture | undefined;
  pictures: Picture[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  availableReactions?: { id: string; name: string; svg: string }[];
}

export default function ImageModal({
  picture,
  pictures,
  currentIndex,
  onClose,
  onNavigate,
  availableReactions = [],
}: ImageModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const minSwipeDistance = 50;

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setIsLoaded(false);
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < pictures.length - 1) {
      setIsLoaded(false);
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, pictures.length, onNavigate]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleResetLoad = useCallback(() => {
    setIsLoaded(false);
  }, []);

  // Keyboard navigation and escape handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, handlePrevious, handleNext, isExpanded]);

  // Mobile swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  // Format date in French locale
  const formatDate = useCallback(() => {
    if (!picture) return '';
    const date = new Date(picture.created_at);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [picture]);

  // If picture becomes undefined (e.g. deleted), close the modal
  useEffect(() => {
    if (!picture && pictures.length > 0) {
      onClose();
    }
  }, [picture, pictures.length, onClose]);

  if (!picture) return null;

  // Fullscreen mode is only for desktop
  if (isExpanded) {
    return (
      <ImageModalExpanded
        picture={picture}
        pictures={pictures}
        currentIndex={currentIndex}
        isLoaded={isLoaded}
        onImageLoad={handleImageLoad}
        onToggleExpanded={toggleExpanded}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    );
  }

  // Conditional rendering for mobile vs desktop
  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden">
        <ImageModalMobile
          picture={picture}
          isLoaded={isLoaded}
          onClose={onClose}
          onImageLoad={handleImageLoad}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          formatDate={formatDate}
          availableReactions={availableReactions}
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <ImageModalDesktop
          picture={picture}
          pictures={pictures}
          currentIndex={currentIndex}
          isLoaded={isLoaded}
          onClose={onClose}
          onNavigate={onNavigate}
          onImageLoad={handleImageLoad}
          onResetLoad={handleResetLoad}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToggleExpanded={toggleExpanded}
          formatDate={formatDate}
          availableReactions={availableReactions}
        />
      </div>
    </>
  );
}
