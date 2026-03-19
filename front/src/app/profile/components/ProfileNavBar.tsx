'use client';

import { Camera, User } from '@/components/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileNavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Mon compte',
      href: '/profile/mon-compte',
      icon: <User size={20} />,
    },
    {
      label: 'Mes photos',
      href: '/profile/mes-photos',
      icon: <Camera size={20} />,
    },
    // {
    //   label: 'Mes Glims',
    //   href: '/profile/mes-glims',
    //   icon: <Users size={20} />,
    // },
    // {
    //   label: 'Mon abonnement',
    //   href: '/profile/mon-abonnement',
    //   icon: <CreditCard size={20} />,
    // },
    // {
    //   label: 'Sécurité',
    //   href: '/profile/securite',
    //   icon: <Lock size={20} />,
    // },
    // {
    //   label: 'Téléchargements et favoris',
    //   href: '/profile/telechargement-et-favoris',
    //   icon: <Download size={20} />,
    // },
  ];

  return (
    <div className="flex w-full md:flex-col gap-1 md:gap-2 border-b md:border-b-0 border-slate-100 pb-4 md:pb-0 px-2 sm:px-4 md:px-0 overflow-x-auto scrollbar-hide">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 whitespace-nowrap ${
            pathname === item.href
              ? 'bg-orange-50 text-orange-600 font-bold shadow-sm'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          } active:scale-95 duration-200`}>
          <span className="md:pr-2 lg:pr-4">{item.icon}</span>
          <span className="text-xs lg:text-[0.8rem] max-md:hidden">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
