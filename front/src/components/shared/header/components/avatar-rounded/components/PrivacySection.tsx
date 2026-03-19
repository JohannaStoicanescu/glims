import Link from 'next/link';

interface PrivacyLink {
  href: string;
  label: string;
}

interface PrivacySectionProps {
  onLinkClick: () => void;
}

const privacyLinks: PrivacyLink[] = [
  { href: '/privacy', label: 'Politique de confidentialité' },
  { href: '/terms', label: "Conditions d'utilisation" },
];

export default function PrivacySection({ onLinkClick }: PrivacySectionProps) {
  return (
    <div className="px-4 py-2">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
        Confidentialité et conditions d&apos;utilisation
      </p>
      <nav className="space-y-1">
        {privacyLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
