'use client';

import { buttonStyles } from './utils/button-styles';

interface ButtonFormProps {
  readonly icon?: React.ReactNode;
  readonly iconPosition?: 'right' | 'left';
  readonly text?: React.ReactNode;
  readonly style: keyof typeof buttonStyles;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  readonly extraCss?: string;
}

export default function ButtonForm({
  icon,
  iconPosition = 'left',
  text,
  style,
  type = 'button',
  onClick,
  extraCss = '',
}: ButtonFormProps) {
  const buttonStyle = buttonStyles[style];

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl cursor-pointer transition-all ${buttonStyle} ${extraCss}`}
      onClick={onClick}>
      {iconPosition === 'left' && icon}
      {text}
      {iconPosition === 'right' && icon}
    </button>
  );
}
