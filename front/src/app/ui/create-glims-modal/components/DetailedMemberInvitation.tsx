'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Dropdown } from '../..';
import { CreateGlimForm, GlimRole } from '../CreateGlimsModal';
import { Trash2, Check, ChevronDown, X } from '../../icons';

const ROLES: GlimRole[] = ['Lecteur', 'Éditeur', 'Administrateur'];

export default function DetailedMemberInvitation() {
  const { watch, setValue } = useFormContext<CreateGlimForm>();
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bulkRoleDropdown, setBulkRoleDropdown] = useState(false);

  const members = watch('members');

  const toggleSelect = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmails.length === members.length && members.length > 0) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(members.map((m) => m.email));
    }
  };

  const deleteSelected = () => {
    setValue(
      'members',
      members.filter((m) => !selectedEmails.includes(m.email))
    );
    setSelectedEmails([]);
  };

  const updateRole = (email: string, role: GlimRole) => {
    setValue(
      'members',
      members.map((m) => (m.email === email ? { ...m, role } : m))
    );
    setActiveDropdown(null);
  };

  const updateBulkRole = (role: GlimRole) => {
    setValue(
      'members',
      members.map((m) =>
        selectedEmails.includes(m.email) ? { ...m, role } : m
      )
    );
    setBulkRoleDropdown(false);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-[400px]">
      {/* BULK ACTIONS HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSelectAll}
            className="text-sm font-semibold text-orange-600 hover:underline cursor-pointer">
            {selectedEmails.length === members.length && members.length > 0
              ? 'Tout déselectionner'
              : 'Tout sélectionner'}
          </button>
          <span className="w-px h-4 bg-gray-300"></span>
          <span className="font-bold ">
            {selectedEmails.length} sélectionnés
          </span>
          {selectedEmails.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedEmails([])}
              className="text-gray-400 hover:text-black">
              <X size={16} />
            </button>
          )}
        </div>

        {selectedEmails.length > 0 && (
          <button
            type="button"
            onClick={deleteSelected}
            className="w-10 h-10 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center transition">
            <Trash2 size={20} />
          </button>
        )}
      </div>

      {/* BULK ROLE EDIT */}
      {selectedEmails.length > 0 && (
        <div className="mb-6">
          <Dropdown
            isOpen={bulkRoleDropdown}
            onClose={() => setBulkRoleDropdown(false)}
            width="w-full"
            trigger={
              <button
                type="button"
                onClick={() => setBulkRoleDropdown(!bulkRoleDropdown)}
                className="w-full flex items-center justify-between bg-gray-100 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition">
                <span>Modifier les rôles</span>
                <ChevronDown size={20} />
              </button>
            }>
            <div className="p-1">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => updateBulkRole(role)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 rounded-md transition">
                  {role}
                </button>
              ))}
            </div>
          </Dropdown>
        </div>
      )}

      {/* MEMBER LIST */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {members.map((member) => (
          <div
            key={member.email}
            className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Avatar Placeholder */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs flex-shrink-0">
                {/* Image would go here */}
                {/* <img src="..." className="w-full h-full rounded-full object-cover" /> */}
                <span className="uppercase">
                  {member.email.substring(0, 2)}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Dropdown
                isOpen={activeDropdown === member.email}
                onClose={() => setActiveDropdown(null)}
                width="w-32"
                align="right"
                trigger={
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === member.email ? null : member.email
                      )
                    }
                    className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition min-w-[90px] justify-between">
                    <span>{member.role}</span>
                    <ChevronDown size={14} />
                  </button>
                }>
                <div className="p-1">
                  {ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => updateRole(member.email, role)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition flex items-center justify-between ${
                        member.role === role
                          ? 'text-orange-600 bg-orange-50'
                          : 'hover:bg-gray-50'
                      }`}>
                      {role}
                      {member.role === role && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </Dropdown>

              <label className="relative flex items-center justify-center cursor-pointer p-1">
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(member.email)}
                  onChange={() => toggleSelect(member.email)}
                  className="peer sr-only"
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white peer-checked:bg-orange-500 peer-checked:border-orange-500 flex items-center justify-center transition-colors">
                  <Check
                    size={14}
                    className="text-white opacity-0 peer-checked:opacity-100"
                    strokeWidth={3}
                  />
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
