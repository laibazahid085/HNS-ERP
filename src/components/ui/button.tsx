import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] disabled:pointer-events-none disabled:opacity-50 rounded-[12px] cursor-pointer';

    const variants = {
      primary:
        'bg-[#C02080] text-white hover:bg-[#d63a96] active:bg-[#a01868]',
      secondary:
        'bg-[#f0f2f7] text-[#001F5B] dark:bg-[#0a2d6b] dark:text-white hover:bg-[#e2e6f0]',
      outline:
        'border border-[#f0f2f7] dark:border-[#0a2d6b] bg-transparent text-[#001F5B] dark:text-white hover:bg-[#f0f2f7] dark:hover:bg-[#0a2d6b]',
      ghost:
        'text-[#001F5B] dark:text-white hover:bg-[#f0f2f7] dark:hover:bg-[#0a2d6b]',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';