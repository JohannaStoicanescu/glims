'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ButtonForm, StepIndicators } from '../..';
import { CreateGlimForm } from '../CreateGlimsModal';
import {
  Mail,
  Plus,
  Trash2,
  ChevronRight,
  Search,
  QrCode,
  Crown,
} from '../../icons';
import DetailedMemberInvitation from './DetailedMemberInvitation';

interface Step2Props {
  showInviteDetails: boolean;
  setShowInviteDetails: (show: boolean) => void;
}

export default function Step2({
  showInviteDetails,
  setShowInviteDetails,
}: Step2Props) {
  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = useFormContext<CreateGlimForm>();
  const [activeTab, setActiveTab] = useState<'email' | 'link'>('email');
  const [emailInput, setEmailInput] = useState('');

  const members = watch('members');
  const reactionsEnabled = watch('reactionsEnabled');
  const reactions = watch('reactions');

  const addMember = () => {
    if (emailInput && emailInput.includes('@')) {
      if (!members.some((m) => m.email === emailInput)) {
        setValue('members', [
          ...members,
          { email: emailInput, role: 'Lecteur' },
        ]);
      }
      setEmailInput('');
    }
  };

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

  if (showInviteDetails) {
    return <DetailedMemberInvitation />;
  }

  return (
    <div className="flex flex-col flex-1 gap-6">
      {/* TABS */}
      <div className="flex gap-4 mb-2">
        <button
          type="button"
          onClick={() => setActiveTab('email')}
          className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'email'
              ? 'border-gray-300 bg-white text-black shadow-sm'
              : 'border-transparent bg-gray-50 text-gray-500'
          }`}>
          <Mail size={18} />
          <span className="font-medium">Par email</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('link')}
          className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'link'
              ? 'border-gray-300 bg-white text-black shadow-sm'
              : 'border-transparent bg-gray-50 text-gray-500'
          }`}>
          <QrCode size={18} />
          <span className="font-medium">Lien et QR-code</span>
        </button>
      </div>

      {/* INPUT OR LINK PLACEHOLDER */}
      {activeTab === 'email' ? (
        <>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addMember())
              }
              placeholder="Ajouter des personnes ou des groupes"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition"
            />
          </div>

          {/* AVATARS */}
          <div className="flex items-center gap-[-8px]">
            {members.slice(0, 5).map((member, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold -ml-2 first:ml-0 z-10">
                {member.email.substring(0, 2).toUpperCase()}
              </div>
            ))}
            {members.length > 5 && (
              <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold -ml-2 z-0">
                +{members.length - 5}
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowInviteDetails(true)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:border-orange-600 transition cursor-pointer ml-2 shadow-sm">
              <Plus size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center text-gray-500 text-sm italic">
          La génération de lien et QR Code sera disponible prochainement.
        </div>
      )}

      <div className="h-px bg-gray-100 my-2" />

      {/* REACTIONS TOGGLE */}
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
                className="relative group w-12 h-12 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-2xl bg-white cursor-pointer">
                {emoji}
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow-lg z-20">
                  <Trash2 size={12} />
                </div>
              </button>
            ))}
            <button
              type="button"
              onClick={addReaction}
              className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition">
              <Plus size={24} />
            </button>
            <div className="ml-auto flex items-center justify-center">
              <button className="w-8 h-8 rounded-full text-slate-900 transition bg-amber-200 hover:bg-amber-300 cursor-pointer shadow-sm flex items-center justify-center">
                <Crown
                  size={16}
                  fill="currentColor"
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-auto space-y-4 pt-4">
        <StepIndicators
          currentStep={1}
          numberOfSteps={2}
        />

        <ButtonForm
          style="dark"
          text="Valider la création"
          icon={<ChevronRight size={20} />}
          iconPosition="right"
          type="submit"
          extraCss="w-full rounded-xl py-4 text-lg"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
}
