'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;
  const ariaLabel = `${title}`;

  // Use href presence as the only condition to avoid hydration error
  const shouldRenderLink = Boolean(href) && !onClick;

  if (shouldRenderLink) {
    return (
      // REDIRECT LINK TO ANOTHER PAGE
      <Link
        href={href || ''}
        aria-label={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
        className={`
          flex items-center ${reduced ? 'justify-center' : ''} font-medium
          w-full p-2 rounded-lg border border-transparent transition-all
          ${isActive 
            ? 'text-orange-600 bg-orange-50 border-orange-100' 
            : 'text-gray-800 hover:text-orange-600 hover:bg-red-50 hover:border-red-100 focus:text-orange-600 focus:bg-red-50 focus:border-red-100'}
          cursor-pointer`}>
        {icon && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
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
      {icon && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
      <span
        className={`text-sm lg:text-base whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${
          reduced ? 'max-w-0 opacity-0 ml-0' : 'max-w-[200px] opacity-100 ml-4'
        }`}>
        {title}
      </span>
    </button>
  );
}
