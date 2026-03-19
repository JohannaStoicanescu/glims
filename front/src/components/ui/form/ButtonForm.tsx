'use client';

import { ReactNode, MouseEvent } from 'react';
import { buttonStyles } from './utils/button-styles';

interface ButtonFormProps {
  readonly icon?: ReactNode;
  readonly iconPosition?: 'right' | 'left';
  readonly text?: ReactNode;
  readonly style: keyof typeof buttonStyles;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  readonly extraCss?: string;
  readonly disabled?: boolean;
  readonly ariaLabel?: string;
  readonly ariaExpanded?: boolean;
  readonly ariaControls?: string;
}

export default function ButtonForm({
  icon,
  iconPosition = 'left',
  text,
  style,
  type = 'button',
  onClick,
  extraCss = '',
  disabled = false,
  ariaLabel,
  ariaExpanded,
  ariaControls,
}: ButtonFormProps) {
  const buttonStyle = buttonStyles[style];

  return (
    <button
      type={type}
      className={`
        flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all 
        ${buttonStyle} 
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${extraCss}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}>
      {iconPosition === 'left' && icon && (
        <span
          className="flex-shrink-0"
          aria-hidden="true">
          {icon}
        </span>
      )}

      {text && <span>{text}</span>}

      {iconPosition === 'right' && icon && (
        <span
          className="flex-shrink-0"
          aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}
