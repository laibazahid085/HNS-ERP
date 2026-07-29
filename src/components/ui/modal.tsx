'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'xl',
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F5B]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] bg-white dark:bg-[#001f5b] p-6 shadow-2xl transition-all z-10 max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-start justify-between border-b border-[#f0f2f7] dark:border-[#0a2d6b] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#001F5B] dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs text-[#5a6478] dark:text-[#a0aec0]">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-[8px] p-1 text-[#5a6478] hover:bg-[#f0f2f7] dark:hover:bg-[#0a2d6b] hover:text-[#001F5B] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">{children}</div>
      </div>
    </div>
  );
}