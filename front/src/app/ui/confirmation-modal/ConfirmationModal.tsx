'use client';

import { useState } from 'react';

interface ConfirmationModalProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  radial?: boolean;
}

export function ConfirmationModal({
  icon,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  radial = false,
}: ConfirmationModalProps) {
  //TODO: handle show/hide from parent component : remove when implemented
  const [showModal, setShowModal] = useState(true);

  return (
    showModal && (
      <div>
        <div
          onClick={() => setShowModal(false)}
          className="fixed z-10 w-full h-full bg-black opacity-20"></div>
        <div className="fixed z-20 m-auto inset-y-0 inset-x-0 w-11/12 h-1/2 md:w-1/2 lg:w-2/6">
          <div
            className={`rounded-xl p-6 md:p-10 flex flex-col items-center gap-4 
            ${radial ? 'bg-radial from-red-100 via-white to-white bg-[length:200%_200%] bg-top' : 'bg-white'}`}>
            <span className="text-4xl bg-red-50 text-red-500 rounded-full w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
              {icon}
            </span>
            <p className="text-center font-semibold text-2xl">{title}</p>
            <p className="text-center text-gray-600 w-11/12 md:w-2/3">
              {message}
            </p>
            <div className="w-full flex items-center gap-2">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl border cursor-pointer transition text-black bg-white border-gray-300 hover:bg-black hover:text-white hover:border-black"
                onClick={onCancel}>
                {cancelButtonText}
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl border cursor-pointer transition text-white bg-black border-black hover:bg-white hover:text-black"
                onClick={onConfirm}>
                {confirmButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
