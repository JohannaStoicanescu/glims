import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Glims',
  description: 'Glims app: management of my glims',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <link
        rel="icon"
        href="/favicon.ico"
        sizes="any"
      />
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
