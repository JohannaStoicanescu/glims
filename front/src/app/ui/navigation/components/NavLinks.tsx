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
      <a
        href={href}
        aria-label={ariaLabel}
        className={`
          flex items-center ${reduced ? 'justify-center' : ''} text-gray-600 font-medium
          w-full p-2 rounded-lg border border-transparent
          hover:text-orange-500 hover:bg-orange-100 hover:border-orange-200 focus:text-orange-500 focus:bg-orange-100 focus:border-orange-200 cursor-pointer transition`}>
        {icon && <span className={`${reduced ? '' : 'mr-2'}`}>{icon}</span>}
        {!reduced && <span>{title}</span>}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        flex items-center ${reduced ? 'justify-center' : ''} text-gray-600 font-medium
        w-full p-2 rounded-lg border border-transparent
        hover:text-orange-500 hover:bg-orange-100 hover:border-orange-200 focus:text-orange-500 focus:bg-orange-100 focus:border-orange-200 cursor-pointer transition`}>
      {icon && <span className={`${reduced ? '' : 'mr-2'}`}>{icon}</span>}
      {!reduced && <span>{title}</span>}
    </button>
  );
}
