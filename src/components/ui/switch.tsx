'use client';

import * as React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = '', label, description, checked, onChange, disabled, ...props }, ref) => {
    return (
      <label
        className={`inline-flex items-center justify-between gap-3 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } ${className}`}
      >
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-xs font-semibold text-[#001F5B] dark:text-white">
                {label}
              </span>
            )}
            {description && (
              <span className="text-[10px] text-[#5a6478] dark:text-[#a0aec0]">
                {description}
              </span>
            )}
          </div>
        )}
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          <div className="h-6 w-11 rounded-full bg-[#f0f2f7] dark:bg-[#0a2d6b] peer-checked:bg-[#C02080] transition-colors peer-focus:ring-2 peer-focus:ring-[#00BFFF] peer-focus:ring-offset-1" />
          <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
        </div>
      </label>
    );
  }
);
Switch.displayName = 'Switch';