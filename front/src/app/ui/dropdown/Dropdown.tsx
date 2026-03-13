'use client';

import React, { ReactNode, isValidElement, cloneElement } from 'react';
import { Modal } from '..';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  align?: 'left' | 'right';
  width?: string;
  usePortal?: boolean;
}

/**
 * Dropdown component using the Modal portal for best practices and efficiency.
 * It provides a consistent behavior for all dropdowns in the app.
 */
export default function Dropdown({
  isOpen,
  onClose,
  trigger,
  children,
  className = '',
  containerClassName = '',
  align = 'right',
  width = 'w-48',
  usePortal = false, // Default to false so absolute positioning works relative to trigger
}: DropdownProps) {
  // Add ARIA attributes to trigger if it's a valid React element
  const accessibleTrigger = isValidElement(trigger) 
    ? cloneElement(trigger as React.ReactElement<any>, {
        'aria-haspopup': 'true',
        'aria-expanded': isOpen,
      })
    : trigger;

  return (
    <div className={`relative ${containerClassName}`}>
      {accessibleTrigger}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        showOverlay={false}
        usePortal={usePortal}
        position="custom"
        className={`z-50 ${usePortal ? '' : `absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-1`} ${width} bg-white border border-gray-200 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}>
        <div className="overflow-y-auto max-h-[70vh]" role="menu">{children}</div>
      </Modal>
    </div>
  );
}
