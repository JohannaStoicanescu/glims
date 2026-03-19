'use client';

import { ReactNode, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useIsMobile } from '@/hooks/use-media-query';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
  containerClassName?: string;
  position?: 'center' | 'bottom' | 'custom';
  usePortal?: boolean;
}

/**
 * Base Modal component with accessibility and scroll-lock features.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showOverlay = true,
  closeOnOverlayClick = true,
  ariaLabelledBy,
  ariaDescribedBy,
  className = '',
  containerClassName = '',
  position = 'center',
  usePortal = true,
}: ModalProps) {
  const isMobile = useIsMobile();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Handle click outside when no overlay is present
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !showOverlay &&
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen && !showOverlay) {
      // Delay listener to avoid catching the click that opens the modal/dropdown
      const timeout = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => {
        clearTimeout(timeout);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, showOverlay, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling on body if it's a "real" modal (has overlay)
      if (showOverlay) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown, showOverlay]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPositionClasses = () => {
    if (position === 'custom') return '';
    if (isMobile || position === 'bottom')
      return 'items-end justify-center p-0';
    return 'items-center justify-center p-4';
  };

  const modalContent = (
    <div
      className={`
        ${position === 'custom' ? 'contents' : `fixed inset-0 z-50 flex ${getPositionClasses()} ${containerClassName}`}
      `}
      role="dialog"
      aria-modal={showOverlay ? 'true' : 'false'}
      aria-labelledby={ariaLabelledBy || (title ? 'modal-title' : undefined)}
      aria-describedby={ariaDescribedBy}
      ref={modalRef}>
      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black/80 transition-opacity"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Modal Container */}
      <div
        className={`
          bg-white shadow-xl z-50 overflow-hidden
          ${position === 'custom' ? '' : 'relative'}
          ${
            position !== 'custom' && (isMobile || position === 'bottom')
              ? `w-full ${className.includes('h-full') ? 'h-full' : 'max-h-[90vh] rounded-t-2xl'} flex flex-col`
              : position !== 'custom'
                ? `mx-auto rounded-2xl animate-in fade-in zoom-in duration-200 ${className.includes('max-w-') ? '' : 'max-w-md'}`
                : ''
          }
          ${className}
        `}>
        {children}
      </div>
    </div>
  );

  if (!usePortal) return modalContent;

  // We mount the modal at the end of the body to avoid stacking context issues
  return createPortal(modalContent, document.body);
}
