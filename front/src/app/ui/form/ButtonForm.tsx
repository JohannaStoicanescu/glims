'use client';

const buttonStyles = {
  dark: 'text-white bg-black border border-black hover:bg-white hover:text-black',
  medium:
    'text-black bg-gray-100 border border-gray-100 hover:border-black hover:bg-white hover:text-black',
  light:
    'text-black bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black',
} as const;

interface ButtonFormProps {
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
  text?: React.ReactNode;
  style: keyof typeof buttonStyles;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  extraCss?: string;
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
