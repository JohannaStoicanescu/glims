import Link from 'next/link';

interface NavLinksProps {
  readonly title: string;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly icon: React.ReactNode;
  readonly reduced?: boolean;
}

export default function NavLinks({
  title,
  href,
  onClick,
  icon,
  reduced,
}: NavLinksProps) {
  const ariaLabel = `Lien de navigation vers ${title}`;

  // Use href presence as the only condition to avoid hydration error
  const shouldRenderLink = Boolean(href) && !onClick;

  if (shouldRenderLink) {
    return (
      // REDIRECT LINK TO ANOTHER PAGE
      <Link
        href={href || ''}
        aria-label={ariaLabel}
        className={`
          flex items-center ${reduced ? 'justify-center' : ''} text-gray-800 font-medium
          w-full p-2 rounded-lg border border-transparent
          hover:text-orange-600 hover:bg-red-50 hover:border-red-100 focus:text-orange-600 focus:bg-red-50 focus:border-red-100 cursor-pointer transition`}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span
          className={`text-sm lg:text-base whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${
            reduced
              ? 'max-w-0 opacity-0 ml-0'
              : 'max-w-[200px] opacity-100 ml-4'
          }`}>
          {title}
        </span>
      </Link>
    );
  }

  return (
    // BUTTON TO OPEN MODAL
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        flex items-center ${reduced ? 'justify-center' : ''} text-gray-800 font-medium
        w-full p-2 rounded-lg border border-transparent
        hover:text-orange-600 hover:bg-red-50 hover:border-red-100 focus:text-orange-600 focus:bg-red-50 focus:border-red-100 cursor-pointer transition`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span
        className={`text-sm lg:text-base whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${
          reduced ? 'max-w-0 opacity-0 ml-0' : 'max-w-[200px] opacity-100 ml-4'
        }`}>
        {title}
      </span>
    </button>
  );
}
