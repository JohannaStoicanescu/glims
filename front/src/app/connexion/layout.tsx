import type { Metadata } from 'next';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Page de connexion Glims',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
