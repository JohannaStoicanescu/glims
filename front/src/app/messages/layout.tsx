import type { Metadata } from 'next';

import '../globals.css';
import { Header, SidePanel } from '../ui';

export const metadata: Metadata = {
  title: 'Messages',
  description: 'Les notifications nouvelles et anciennes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidePanel />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
