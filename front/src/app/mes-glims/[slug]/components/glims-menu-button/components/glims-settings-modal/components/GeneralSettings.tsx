'use client';

import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { ControlledInputForm, ButtonForm } from '@/components';
import { Plus, Trash2, Crown, Pencil } from '@/components/ui/icons';
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
              alt="Cover"
              fill
              className="object-cover transition group-hover:brightness-90"
            />
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 text-white cursor-pointer">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                <Pencil size={24} />
              </div>
            </button>
          </div>
        </div>

        {/* Reactions Toggle */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={reactionsEnabled}
                onChange={(e) => setValue('reactionsEnabled', e.target.checked)}
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="font-bold text-gray-900">
              Afficher les réactions
            </span>
          </div>

          {reactionsEnabled && (
            <div className="flex flex-wrap gap-3">
              {reactions.map((emoji, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => removeReaction(index)}
                  className="relative group w-12 h-12 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-2xl bg-white cursor-pointer hover:border-gray-400 transition">
                  {emoji}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow-lg z-20">
                    <Trash2 size={12} />
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={addReaction}
                className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition cursor-pointer">
                <Plus size={24} />
              </button>

              <div className="ml-auto flex items-center">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm hover:bg-orange-200 transition cursor-pointer">
                  <Crown
                    size={20}
                    fill="currentColor"
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
