'use client';

import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { ControlledInputForm, ButtonForm } from '@/app/ui';
import { Plus, Trash2, Crown, Pencil } from '@/app/ui/icons';
import { GlimsSettingsForm } from '../GlimsSettingsModal';

export default function GeneralSettings() {
  const { watch, setValue } = useFormContext<GlimsSettingsForm>();

  const reactionsEnabled = watch('reactionsEnabled');
  const reactions = watch('reactions');
  const coverPhoto = watch('coverPhoto');

  const removeReaction = (index: number) => {
    const newReactions = [...reactions];
    newReactions.splice(index, 1);
    setValue('reactions', newReactions);
  };

  const addReaction = () => {
    const emoji = prompt('Ajouter un emoji :');
    if (emoji) {
      setValue('reactions', [...reactions, emoji]);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-4">
      <div className="space-y-6">
        <ControlledInputForm
          label="Nom du Glims"
          name="name"
          placeholder="Le nom du Glims"
          type="text"
          required
        />

        <ControlledInputForm
          label="Description (facultatif)"
          name="description"
          placeholder="Ajoutez une description"
          type="text"
        />

        {/* Cover Photo */}
        <div className="space-y-3">
          <label className="text-black font-medium block">
            Photo de couverture
          </label>
          <div className="relative w-full h-48 rounded-2xl overflow-hidden group">
            <Image
              src={coverPhoto}
              alt="Aperçu de la photo de couverture"
              fill
              className="object-cover transition group-hover:brightness-90"
            />
            <button
              type="button"
              aria-label="Modifier la photo de couverture"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 text-white cursor-pointer">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                <Pencil size={24} aria-hidden="true" />
              </div>
            </button>
          </div>
        </div>

        {/* Reactions Toggle */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer" htmlFor="reactions-toggle">
              <input
                id="reactions-toggle"
                type="checkbox"
                className="sr-only peer"
                checked={reactionsEnabled}
                onChange={(e) => setValue('reactionsEnabled', e.target.checked)}
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="font-bold text-gray-900 ml-3">
                Afficher les réactions
              </span>
            </label>
          </div>

          {reactionsEnabled && (
            <div className="flex flex-wrap gap-3" role="group" aria-label="Liste des réactions autorisées">
              {reactions.map((emoji, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => removeReaction(index)}
                  aria-label={`Supprimer la réaction ${emoji}`}
                  className="relative group w-12 h-12 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-2xl bg-white cursor-pointer hover:border-gray-400 transition">
                  <span aria-hidden="true">{emoji}</span>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow-lg z-20">
                    <Trash2 size={12} aria-hidden="true" />
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={addReaction}
                aria-label="Ajouter un emoji"
                className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition cursor-pointer">
                <Plus size={24} aria-hidden="true" />
              </button>

              <div className="ml-auto flex items-center">
                <button
                  type="button"
                  aria-label="Avantages Premium"
                  className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm hover:bg-orange-200 transition cursor-pointer">
                  <Crown
                    size={20}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <ButtonForm
          style="dark"
          text="Enregistrer"
          type="submit"
          extraCss="w-full rounded-xl py-4 text-lg"
        />
      </div>
    </div>
  );
}
