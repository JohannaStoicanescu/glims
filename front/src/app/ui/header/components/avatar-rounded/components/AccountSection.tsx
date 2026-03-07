import Link from 'next/link';
import { ElementType } from 'react';

import { User, CreditCard, Download, Camera, Lock } from '@/app/ui/icons';

interface AccountLink {
  href: string;
  icon: ElementType;
  label: string;
  badge?: string;
}

interface AccountSectionProps {
  plan: string;
  onLinkClick: () => void;
}

export default function AccountSection({
  plan,
  onLinkClick,
}: AccountSectionProps) {
  const accountLinks: AccountLink[] = [
    { href: '/profile', icon: User, label: 'Mon compte' },
    {
      href: '/profile/mon-abonnement',
      icon: CreditCard,
      label: 'Mon abonnement',
      badge: plan,
    },
    {
      href: '/profile/telechargement-et-favoris',
      icon: Download,
      label: 'Téléchargements et favoris',
    },
    { href: '/profile/mes-photos', icon: Camera, label: 'Mes photos' },
    { href: '/profile/securite', icon: Lock, label: 'Sécurité' },
  ];

  return (
    <div className="px-4 py-2">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
        Votre compte
      </p>
      <nav className="space-y-1">
        {accountLinks.map(({ href, icon: Icon, label, badge }) => (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
            {badge && (
              <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
