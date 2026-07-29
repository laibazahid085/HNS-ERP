import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', icon, type, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {icon && (
          <div className="pointer-events-none absolute left-3 text-[#5a6478]">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`h-10 w-full rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] bg-white dark:bg-[#00143c] px-3 py-2 text-sm text-[#001F5B] dark:text-white placeholder-[#5a6478] transition-colors focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF] disabled:cursor-not-allowed disabled:opacity-50 ${
            icon ? 'pl-9' : ''
          } ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';