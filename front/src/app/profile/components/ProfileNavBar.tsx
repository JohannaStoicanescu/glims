'use client';

import { Camera, CreditCard, Download, User, Lock } from '@/app/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileNavBar() {
  const pathname = usePathname();
  const currentSegment = pathname.split('/').pop();

  const navigationItems = [
    {
      label: 'Mon compte',
      href: '/profile/mon-compte',
      value: 'mon-compte',
      icon: <User className="w-4 h-4 lg:w-5 lg:h-5" />,
    },
    {
      label: 'Mon abonnement',
      href: '/profile/mon-abonnement',
      value: 'mon-abonnement',
      icon: <CreditCard className="w-4 h-4 lg:w-5 lg:h-5" />,
    },
    {
      label: 'Téléchargement et favoris',
      href: '/profile/telechargement-et-favoris',
      value: 'telechargement-et-favoris',
      icon: <Download className="w-4 h-4 lg:w-5 lg:h-5" />,
    },
    {
      label: 'Mes photos',
      href: '/profile/mes-photos',
      value: 'mes-photos',
      icon: <Camera className="w-4 h-4 lg:w-5 lg:h-5" />,
    },
    {
      label: 'Sécurité',
      href: '/profile/securite',
      value: 'securite',
      icon: <Lock className="w-4 h-4 lg:w-5 lg:h-5" />,
    },
  ];

  return (
    <nav className="flex" aria-label="Navigation du profil">
      {navigationItems.map((item, index) => {
        const isActive = currentSegment === item.value;
        return (
          <Link
            key={item.href + index}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`max-md:w-full px-4 py-2 flex justify-center items-center cursor-pointer border-b-2 rounded-t-lg text-center ${
              isActive
                ? 'border-orange-600 hover:border-b-orange-600 text-orange-600'
                : 'border-b-white hover:border-b-gray-500 hover:text-gray-600'
            } transition duration-200`}>
            <span className="md:pr-2 lg:pr-4" aria-hidden="true">{item.icon}</span>
            <span className="text-xs lg:text-[0.8rem] max-md:hidden">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
