'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from '@/hooks';
import { Header, SidePanel } from '../ui';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isPending && !session) {
  //     router.push('/connexion');
  //   }
  // }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
      </div>
    );
  }

  // if (!session) {
  //   return null;
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidePanel />
      <div className="w-full h-full flex flex-col min-w-0">
        <Header />
        <div className="w-full flex flex-1 px-2 sm:px-4 md:px-8 min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}
