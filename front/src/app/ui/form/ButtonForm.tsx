'use client';

const buttonStyles = {
  dark: 'text-white bg-black border-black hover:bg-white hover:text-black',
  medium:
    'text-white bg-gray-500 border-gray-500 hover:bg-gray-600 hover:text-white',
  light:
    'text-black bg-white border-gray-300 hover:bg-black hover:text-white hover:border-black',
} as const;

interface ButtonFormProps {
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'left';
  text?: React.ReactNode;
  style: keyof typeof buttonStyles;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonForm({
  icon,
  iconPosition = 'left',
  text,
  style,
  type = 'button',
  onClick,
}: ButtonFormProps) {
  const buttonStyle = buttonStyles[style];

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl border cursor-pointer transition ${buttonStyle}`}
      onClick={onClick}>
      {iconPosition === 'left' && icon}
      {text}
      {iconPosition === 'right' && icon}
    </button>
  );
}
