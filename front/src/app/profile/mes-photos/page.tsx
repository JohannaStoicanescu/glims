'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useSession, useGetUsersMedia } from '@/hooks';
import { Search, Calendar as CalendarIcon } from '@/components/ui/icons';

export default function MesPhotosPage() {
  const { data: session } = useSession();
  const { data: photos, isLoading } = useGetUsersMedia(session?.user?.id ?? '');

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredPhotos = useMemo(() => {
    if (!photos) return [];

    return photos.filter((photo) => {
      // Event name filter
      const matchesSearch = photo.folder_title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Date range filter
      const photoDate = photo.created_at.split('T')[0]; // Get YYYY-MM-DD
      const matchesStart = !startDate || photoDate >= startDate;
      const matchesEnd = !endDate || photoDate <= endDate;

      return (matchesSearch ?? true) && matchesStart && matchesEnd;
    });
  }, [photos, searchTerm, startDate, endDate]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-0 pt-5 pb-20">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-8">
        Mes photos
      </h1>

      {/* FILTERS */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-col md:flex-row items-end gap-4">
          {/* Search Bar */}
          <div className="flex-1 w-full">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">
              Rechercher
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Nom d'évènement (Glims)..."
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Date Range Start */}
          <div className="w-full md:w-44">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">
              Du
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-9 pr-2 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-xs"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          {/* Date Range End */}
          <div className="w-full md:w-44">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">
              Au
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-9 pr-2 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-xs"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Reset Button */}
          {(searchTerm || startDate || endDate) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStartDate('');
                setEndDate('');
              }}
              className="h-11 text-orange-600 font-bold text-sm px-2 hover:underline whitespace-nowrap mb-1">
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* PHOTO GRID */}
      {filteredPhotos.length > 0 ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
          <Masonry gutter="16px">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative group rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={photo.url}
                  alt={photo.folder_title || 'Photo'}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-sm truncate">
                    {photo.folder_title || 'Sans titre'}
                  </p>
                  <p className="text-white/80 text-[10px] mt-1">
                    {new Date(photo.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <Search className="h-8 w-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium text-center px-4">
            {searchTerm || startDate || endDate
              ? 'Aucune photo ne correspond à vos critères de recherche.'
              : "Vous n'avez pas encore de photos."}
          </p>
        </div>
      )}
    </div>
  );
}
