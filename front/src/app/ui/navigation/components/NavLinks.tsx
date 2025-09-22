interface NavLinksProps {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export default function NavLinks({ title, href, icon }: NavLinksProps) {
  return (
    <a
      href={href}
      aria-label={`Lien de navigation vers ${title}`}
      className="
        flex items-center text-gray-600 font-medium
        w-full p-2 rounded-lg border border-transparent
        hover:text-orange-500 hover:bg-orange-100 hover:border-orange-200 transition">
      {icon && <span className="mr-2">{icon}</span>}
      <span>{title}</span>
    </a>
  );
}
