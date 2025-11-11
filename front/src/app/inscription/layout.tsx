import type { Metadata } from 'next';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Inscription',
  description: "Formulaire d'inscription Glims",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen bg-white">{children}</div>;
}
