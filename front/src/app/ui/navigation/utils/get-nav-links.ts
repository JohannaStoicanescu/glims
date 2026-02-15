import React from 'react';
import { House, SquarePlus, User } from '../../icons';

export interface NavLink {
  title: string;
  href?: string;
  icon: () => React.ReactNode;
}

export const NAV_LINKS: NavLink[] = [
  {
    title: 'Mes Glims',
    href: '/mes-glims',
    icon: () =>
      React.createElement(House, { className: 'w-5 h-5 lg:w-6 lg:h-6' }),
  },
  {
    title: 'Nouveau',
    icon: () =>
      React.createElement(SquarePlus, { className: 'w-5 h-5 lg:w-6 lg:h-6' }),
  },
  {
    title: 'Profile',
    href: '/profile/mon-compte',
    icon: () =>
      React.createElement(User, {
        className: 'w-5 h-5 lg:w-6 lg:h-6',
      }),
  },
];
