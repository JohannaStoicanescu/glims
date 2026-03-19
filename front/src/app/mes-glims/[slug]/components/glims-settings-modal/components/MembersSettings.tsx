'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { Dropdown } from '@/components';
import {
  Trash2,
  Check,
  ChevronDown,
  X,
  User,
  Send,
  UserPlus,
} from '@/components/ui/icons';
import {
  GlimRole,
  GlimsSettingsForm,
} from '../../glims-menu-button/components/glims-settings-modal/GlimsSettingsModal';

const ROLES: GlimRole[] = ['Lecteur', 'Éditeur', 'Administrateur'];

export default function MembersSettings() {
  const { watch, setValue } = useFormContext<GlimsSettingsForm>();
  const [activeSubTab, setActiveSubTab] = useState<'members' | 'invitations'>(
    'members'
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const members = watch('members');
  const invitations = watch('invitations');

  const currentList = activeSubTab === 'members' ? members : invitations;
  const listName = activeSubTab === 'members' ? 'members' : 'invitations';

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === currentList.length && currentList.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentList.map((m) => m.id));
    }
  };

  const deleteSelected = () => {
    setValue(
      listName,
      currentList.filter((m) => !selectedIds.includes(m.id))
    );
    setSelectedIds([]);
  };

  const updateRole = (id: string, role: GlimRole) => {
    setValue(
      listName,
      currentList.map((m) => (m.id === id ? { ...m, role } : m))
    );
    setActiveDropdown(null);
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* TOGGLE MENU */}
      <div className="flex border-b border-gray-100">
        <button
          type="button"
          onClick={() => {
            setActiveSubTab('members');
            setSelectedIds([]);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all border-b-2 ${
            activeSubTab === 'members'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}>
          <User size={20} />
          <span>Membres actuels</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveSubTab('invitations');
            setSelectedIds([]);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all border-b-2 ${
            activeSubTab === 'invitations'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}>
          <Send size={20} />
          <span>Invitations</span>
        </button>
      </div>

      {/* BULK ACTIONS */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSelectAll}
            className="text-sm font-semibold text-orange-600 hover:underline cursor-pointer">
            {selectedIds.length === currentList.length && currentList.length > 0
              ? 'Tout déselectionner'
              : 'Tout sélectionner'}
          </button>
          <span className="w-px h-4 bg-gray-300"></span>
          <span className="font-bold text-gray-900">
            {selectedIds.length} sélectionnés
          </span>
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-gray-400 hover:text-black cursor-pointer">
              <X size={16} />
            </button>
          )}
        </div>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={deleteSelected}
            className="w-10 h-10 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center transition cursor-pointer">
            <Trash2 size={20} />
          </button>
        )}
      </div>

      {/* MEMBER LIST */}
      <div className="space-y-4">
        {currentList.length === 0 ? (
          <div className="py-12 text-center text-gray-400 italic">
            Aucun membre dans cette section.
          </div>
        ) : (
          currentList.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name || ''}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 uppercase font-bold text-xs">
                      {member.email.substring(0, 2)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  {member.name && (
                    <p className="font-bold text-gray-900 truncate">
                      {member.name}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 truncate">
                    {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Dropdown
                  isOpen={activeDropdown === member.id}
                  onClose={() => setActiveDropdown(null)}
                  width="w-36"
                  align="right"
                  trigger={
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === member.id ? null : member.id
                        )
                      }
                      className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl hover:bg-gray-100 transition min-w-[110px] justify-between cursor-pointer">
                      <span className="font-medium">{member.role}</span>
                      <ChevronDown
                        size={16}
                        className="text-gray-400"
                      />
                    </button>
                  }>
                  <div className="p-1">
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => updateRole(member.id, role)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition flex items-center justify-between cursor-pointer ${
                          member.role === role
                            ? 'text-orange-600 bg-orange-50 font-semibold'
                            : 'hover:bg-gray-50'
                        }`}>
                        {role}
                        {member.role === role && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </Dropdown>

                <label className="relative flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(member.id)}
                    onChange={() => toggleSelect(member.id)}
                    className="peer sr-only"
                  />
                  <div className="w-6 h-6 border-2 border-gray-200 rounded-lg bg-white peer-checked:bg-orange-500 peer-checked:border-orange-500 flex items-center justify-center transition-all">
                    <Check
                      size={14}
                      className="text-white opacity-0 peer-checked:opacity-100"
                      strokeWidth={3}
                    />
                  </div>
                </label>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD MEMBER BUTTON */}
      <div className="mt-4">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all cursor-pointer">
          <UserPlus size={20} />
          <span>Ajouter des personnes</span>
        </button>
      </div>
    </div>
  );
}
