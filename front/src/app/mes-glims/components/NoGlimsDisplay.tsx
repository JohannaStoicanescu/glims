'use client';

// import { useState } from 'react';

import { ChevronRight, Plus } from '@/app/ui/icons';

export default function NoGlimsDisplay() {
  // const [isCreateGlimsModalOpen, setIsCreateGlimsModalOpen] = useState(false);

  return (
    <>
      <div className="pt-6 pb-10 md:pt-28 text-center flex-1 flex flex-col max-md:justify-between">
        <div>
          <div className="py-4">
            <p className="text-lg font-bold">Pas de souvenirs pour l’instant</p>
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>Les images que vous ajouterez apparaitrons ici.</p>
              <p>Ajoutez des images et des vidéos dès maintenant !</p>
            </div>
          </div>
          <button
            // onClick={() => setIsCreateGlimsModalOpen(true)}
            aria-label="Créer mon premier Glims"
            className="p-8 md:p-10 border-2 border-gray-200 rounded-full bg-gray-50 text-gray-700
            hover:text-orange-600 hover:bg-red-50 hover:border-red-100 focus:text-orange-600 focus:bg-red-50 focus:border-red-100 cursor-pointer transition">
            <Plus className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true" />
          </button>
        </div>

        <button
          // onClick={() => setIsCreateGlimsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-white bg-black border border-black
          md:hidden hover:bg-white hover:text-black cursor-pointer transition-all">
          Créer mon premier glim
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* CREATE GLIM MODAL */}
      {/* TODO */}
    </>
  );
}
